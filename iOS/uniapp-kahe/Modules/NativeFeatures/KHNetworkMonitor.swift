//
//  KHNetworkMonitor.swift
//  卡核潮玩 - 网络监控
//

import Foundation
import Network
import SystemConfiguration

/// 网络连接类型
@objc
enum KHNetworkConnectionType: Int {
    case unknown = 0
    case wifi = 1
    case cellular = 2
    case ethernet = 3
}

/// 网络状态监控器
@objcMembers
class KHNetworkMonitor: NSObject {
    
    @objc static let shared = KHNetworkMonitor()
    
    private let monitor = NWPathMonitor()
    private let queue = DispatchQueue(label: "com.kahe.network")
    
    @objc private(set) dynamic var isConnected: Bool = false
    @objc private(set) dynamic var connectionType: KHNetworkConnectionType = .unknown
    
    private override init() {
        super.init()
        setupMonitor()
    }
    
    deinit {
        monitor.cancel()
    }
    
    // MARK: - 监控设置
    
    private func setupMonitor() {
        monitor.pathUpdateHandler = { [weak self] path in
            let connected = path.status == .satisfied
            let type: KHNetworkConnectionType
            
            if path.usesInterfaceType(.wifi) {
                type = .wifi
            } else if path.usesInterfaceType(.cellular) {
                type = .cellular
            } else if path.usesInterfaceType(.wiredEthernet) {
                type = .ethernet
            } else {
                type = .unknown
            }
            
            DispatchQueue.main.async {
                self?.isConnected = connected
                self?.connectionType = type
                
                NotificationCenter.default.post(
                    name: NSNotification.Name("KHNetworkStatusChanged"),
                    object: nil,
                    userInfo: ["connected": connected, "type": type.rawValue]
                )
            }
        }
    }
    
    @objc func startMonitoring() {
        monitor.start(queue: queue)
    }
    
    @objc func stopMonitoring() {
        monitor.cancel()
    }
    
    // MARK: - 传统方式检测
    
    @objc static func isNetworkReachable() -> Bool {
        var zeroAddress = sockaddr_in()
        zeroAddress.sin_len = UInt8(MemoryLayout<sockaddr_in>.size)
        zeroAddress.sin_family = sa_family_t(AF_INET)
        
        guard let defaultRouteReachability = withUnsafePointer(to: &zeroAddress, {
            $0.withMemoryRebound(to: sockaddr.self, capacity: 1) {
                SCNetworkReachabilityCreateWithAddress(nil, $0)
            }
        }) else {
            return false
        }
        
        var flags: SCNetworkReachabilityFlags = []
        if !SCNetworkReachabilityGetFlags(defaultRouteReachability, &flags) {
            return false
        }
        
        let isReachable = flags.contains(.reachable)
        let needsConnection = flags.contains(.connectionRequired)
        
        return isReachable && !needsConnection
    }
}
