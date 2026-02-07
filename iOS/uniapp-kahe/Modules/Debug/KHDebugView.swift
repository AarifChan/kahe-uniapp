//
//  KHDebugView.swift
//  uniapp-kahe
//
//  调试面板 - APP 启动时的默认 SwiftUI 页面
//  展示应用/设备/引擎信息，点击按钮切换到 UniApp
//
//  模块：KHDebug
//

import SwiftUI
import UIKit

// MARK: - SwiftUI 调试视图

struct KHDebugView: View {

    /// 引擎是否已预加载完成（轮询 AppDelegate.isEnginePreloaded）
    @State private var enginePreloaded = false

    /// 当前时间戳（每秒刷新，用于验证页面活跃状态）
    @State private var currentTime = Date()

    /// 全局启动模式开关（持久化到 UserDefaults，下次启动生效）
    /// true = 启动进入调试面板，false = 启动直接进入 UniApp
    @AppStorage("kahe_launch_debug_mode") private var debugModeEnabled = true

    /// 定时器
    private let timer = Timer.publish(every: 1, on: .main, in: .common).autoconnect()

    // MARK: - 应用信息（从 Info.plist 读取）

    private let appName: String = {
        Bundle.main.object(forInfoDictionaryKey: "CFBundleDisplayName") as? String
            ?? Bundle.main.object(forInfoDictionaryKey: "CFBundleName") as? String
            ?? "-"
    }()

    private let appVersion: String = {
        Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString") as? String ?? "-"
    }()

    private let buildNumber: String = {
        Bundle.main.object(forInfoDictionaryKey: "CFBundleVersion") as? String ?? "-"
    }()

    private let bundleID: String = {
        Bundle.main.bundleIdentifier ?? "-"
    }()

    // MARK: - Body

    var body: some View {
        NavigationView {
            List {
                // ---- 启动模式开关 ----
                Section(
                    header: Text("启动设置"),
                    footer: Text(debugModeEnabled
                        ? "下次启动 APP 将进入此调试面板"
                        : "下次启动 APP 将直接进入 UniApp")
                ) {
                    Toggle(isOn: $debugModeEnabled) {
                        VStack(alignment: .leading, spacing: 4) {
                            Text("调试模式")
                            Text(debugModeEnabled ? "启动时显示调试面板" : "启动时直接进入 UniApp")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }
                    }
                    .tint(.blue)
                }

                // ---- 应用信息 ----
                Section(header: Text("应用信息")) {
                    infoRow("应用名称", value: appName)
                    infoRow("版本号", value: appVersion)
                    infoRow("Build", value: buildNumber)
                    infoRow("Bundle ID", value: bundleID)
                }

                // ---- UniApp 引擎 ----
                Section(header: Text("UniApp 引擎")) {
                    infoRow("App ID", value: "__UNI__2BE2CDB")
                    HStack {
                        Text("引擎状态")
                            .foregroundColor(.secondary)
                        Spacer()
                        if enginePreloaded {
                            Label("已预加载", systemImage: "checkmark.circle.fill")
                                .foregroundColor(.green)
                                .font(.subheadline.weight(.medium))
                        } else {
                            HStack(spacing: 6) {
                                ProgressView()
                                    .scaleEffect(0.8)
                                Text("预加载中...")
                                    .foregroundColor(.orange)
                                    .font(.subheadline)
                            }
                        }
                    }
                }

                // ---- 设备信息 ----
                Section(header: Text("设备信息")) {
                    infoRow("设备型号", value: UIDevice.current.model)
                    infoRow("设备名称", value: UIDevice.current.name)
                    infoRow("系统版本", value: "\(UIDevice.current.systemName) \(UIDevice.current.systemVersion)")
                    infoRow("屏幕尺寸", value: screenSizeString)
                    infoRow("屏幕比例", value: "@\(Int(UIScreen.main.scale))x")
                }

                // ---- 运行时信息 ----
                Section(header: Text("运行时")) {
                    infoRow("当前时间", value: timeFormatter.string(from: currentTime))
                    infoRow("内存使用", value: memoryUsageString)
                }

                // ---- 进入 UniApp 按钮 ----
                Section(footer: enginePreloaded
                    ? Text("引擎已就绪，点击进入 UniApp 页面")
                    : Text("引擎正在预加载，请稍候...")
                ) {
                    Button(action: enterUniApp) {
                        HStack {
                            Spacer()
                            if enginePreloaded {
                                Label("进入 UniApp", systemImage: "arrow.right.circle.fill")
                                    .font(.headline)
                                    .foregroundColor(.white)
                            } else {
                                HStack(spacing: 8) {
                                    ProgressView()
                                        .tint(.white)
                                    Text("引擎加载中...")
                                        .font(.headline)
                                        .foregroundColor(.white.opacity(0.7))
                                }
                            }
                            Spacer()
                        }
                        .padding(.vertical, 14)
                        .background(
                            RoundedRectangle(cornerRadius: 12)
                                .fill(enginePreloaded ? Color.blue : Color.gray)
                        )
                    }
                    .disabled(!enginePreloaded)
                    .listRowInsets(EdgeInsets(top: 8, leading: 16, bottom: 8, trailing: 16))
                }
            }
            .listStyle(.insetGrouped)
            .navigationTitle("调试面板")
        }
        .navigationViewStyle(.stack)
        .onAppear {
            checkEngineStatus()
        }
        .onReceive(timer) { time in
            currentTime = time
        }
    }

    // MARK: - 辅助视图

    /// 信息行：左侧标题（灰色） + 右侧值（主色）
    private func infoRow(_ title: String, value: String) -> some View {
        HStack {
            Text(title)
                .foregroundColor(.secondary)
            Spacer()
            Text(value)
                .foregroundColor(.primary)
                .multilineTextAlignment(.trailing)
                .font(.subheadline.monospaced())
        }
    }

    // MARK: - 计算属性

    private var screenSizeString: String {
        let bounds = UIScreen.main.bounds
        return "\(Int(bounds.width)) x \(Int(bounds.height)) pt"
    }

    private var memoryUsageString: String {
        var info = mach_task_basic_info()
        var count = mach_msg_type_number_t(MemoryLayout<mach_task_basic_info>.size) / 4
        let result = withUnsafeMutablePointer(to: &info) {
            $0.withMemoryRebound(to: integer_t.self, capacity: 1) {
                task_info(mach_task_self_, task_flavor_t(MACH_TASK_BASIC_INFO), $0, &count)
            }
        }
        guard result == KERN_SUCCESS else { return "-" }
        let usedMB = Double(info.resident_size) / 1024.0 / 1024.0
        return String(format: "%.1f MB", usedMB)
    }

    private var timeFormatter: DateFormatter {
        let f = DateFormatter()
        f.dateFormat = "yyyy-MM-dd HH:mm:ss"
        return f
    }

    // MARK: - 操作

    /// 轮询检查 AppDelegate.isEnginePreloaded 状态
    private func checkEngineStatus() {
        guard let appDelegate = UIApplication.shared.delegate as? AppDelegate else { return }

        if appDelegate.isEnginePreloaded {
            withAnimation {
                enginePreloaded = true
            }
        } else {
            // 每 0.3s 检查一次，直到引擎就绪
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
                checkEngineStatus()
            }
        }
    }

    /// 切换到 UniApp 页面
    private func enterUniApp() {
        guard let appDelegate = UIApplication.shared.delegate as? AppDelegate else { return }
        appDelegate.switchToUniApp()
    }
}

// MARK: - ObjC 可调用的工厂类

/// 提供给 ObjC 层（AppDelegate.m）创建 SwiftUI 调试页面的工厂方法
/// Why: ObjC 无法直接实例化 SwiftUI 的泛型 UIHostingController，
///      通过工厂模式返回 UIViewController 类型来桥接
@objc class KHDebugViewFactory: NSObject {

    /// 创建并返回包含调试面板的 UIViewController
    @objc static func makeDebugViewController() -> UIViewController {
        return UIHostingController(rootView: KHDebugView())
    }
}
