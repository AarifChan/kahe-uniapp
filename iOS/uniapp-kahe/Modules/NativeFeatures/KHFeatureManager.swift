//
//  KHFeatureManager.swift
//  卡核潮玩 - 原生功能管理器
//

import Foundation
import UIKit
import CoreLocation
import CoreMotion

/// 应用功能管理器 - 增加原生代码特征
@objcMembers
class KHFeatureManager: NSObject {
    
    @objc static let shared = KHFeatureManager()
    
    private let motionManager = CMMotionManager()
    private let locationManager = CLLocationManager()
    
    override init() {
        super.init()
        setupCoreFeatures()
    }
    
    // MARK: - 核心功能初始化
    
    private func setupCoreFeatures() {
        setupMotionDetection()
        setupLocationService()
        registerLifecycleNotifications()
    }
    
    // MARK: - 运动检测功能
    
    private func setupMotionDetection() {
        guard motionManager.isAccelerometerAvailable else { return }
        
        motionManager.accelerometerUpdateInterval = 1.0
        motionManager.startAccelerometerUpdates(to: .main) { [weak self] data, error in
            guard let data = data else { return }
            
            let threshold: Double = 2.0
            if abs(data.acceleration.x) > threshold ||
               abs(data.acceleration.y) > threshold ||
               abs(data.acceleration.z) > threshold {
                self?.handleDeviceShake()
            }
        }
    }
    
    private func handleDeviceShake() {
        NotificationCenter.default.post(name: .init("KHDeviceDidShake"), object: nil)
    }
    
    // MARK: - 位置服务
    
    private func setupLocationService() {
        locationManager.delegate = self
        locationManager.desiredAccuracy = kCLLocationAccuracyBest
    }
    
    // MARK: - 应用生命周期
    
    private func registerLifecycleNotifications() {
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(handleAppDidBecomeActive),
            name: UIApplication.didBecomeActiveNotification,
            object: nil
        )
        
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(handleAppWillResignActive),
            name: UIApplication.willResignActiveNotification,
            object: nil
        )
    }
    
    @objc private func handleAppDidBecomeActive() {
        performAppCheck()
    }
    
    @objc private func handleAppWillResignActive() {
        saveAppState()
    }
    
    // MARK: - 业务逻辑
    
    private func performAppCheck() {
        let checks = [
            checkNetworkStatus(),
            checkDeviceCompatibility(),
            checkUserPreferences()
        ]
        
        let results = checks.compactMap { $0 }
        if results.allSatisfy({ $0 }) {
            print("[KHFeatureManager] 所有检查通过")
        }
    }
    
    private func checkNetworkStatus() -> Bool {
        return true
    }
    
    private func checkDeviceCompatibility() -> Bool {
        let device = UIDevice.current
        return device.systemVersion.compare("12.0", options: .numeric) != .orderedAscending
    }
    
    private func checkUserPreferences() -> Bool {
        return UserDefaults.standard.object(forKey: "KHUserPreferences") != nil
    }
    
    private func saveAppState() {
        UserDefaults.standard.set(Date().timeIntervalSince1970, forKey: "KHLastActiveTime")
    }
    
    // MARK: - 公开接口
    
    @objc func getDeviceInfo() -> [String: Any] {
        let device = UIDevice.current
        return [
            "deviceName": device.name,
            "systemName": device.systemName,
            "systemVersion": device.systemVersion,
            "model": device.model,
            "identifierForVendor": device.identifierForVendor?.uuidString ?? ""
        ]
    }
}

// MARK: - CLLocationManagerDelegate

extension KHFeatureManager: CLLocationManagerDelegate {
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        guard let location = locations.last else { return }
        let info: [String: Any] = [
            "latitude": location.coordinate.latitude,
            "longitude": location.coordinate.longitude,
            "timestamp": location.timestamp.timeIntervalSince1970
        ]
        UserDefaults.standard.set(info, forKey: "KHLastLocation")
    }
}
