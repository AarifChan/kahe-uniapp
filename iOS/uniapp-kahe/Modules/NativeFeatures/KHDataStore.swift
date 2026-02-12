//
//  KHDataStore.swift
//  卡核潮玩 - 本地数据管理
//

import Foundation
import CoreData

/// 本地数据持久化管理器
@objcMembers
class KHDataStore: NSObject {
    
    @objc static let shared = KHDataStore()
    
    private let fileManager = FileManager.default
    private let queue = DispatchQueue(label: "com.kahe.datastore", qos: .utility)
    
    private lazy var cacheDirectory: URL = {
        let urls = fileManager.urls(for: .cachesDirectory, in: .userDomainMask)
        return urls[0].appendingPathComponent("KHCache", isDirectory: true)
    }()
    
    private lazy var documentDirectory: URL = {
        let urls = fileManager.urls(for: .documentDirectory, in: .userDomainMask)
        return urls[0].appendingPathComponent("KHData", isDirectory: true)
    }()
    
    override init() {
        super.init()
        createDirectories()
        setupPeriodicCleanup()
    }
    
    // MARK: - 目录管理
    
    private func createDirectories() {
        try? fileManager.createDirectory(at: cacheDirectory, withIntermediateDirectories: true)
        try? fileManager.createDirectory(at: documentDirectory, withIntermediateDirectories: true)
    }
    
    // MARK: - 数据存储
    
    func saveObject<T: Codable>(_ object: T, forKey key: String, inCache: Bool = false) {
        queue.async {
            let directory = inCache ? self.cacheDirectory : self.documentDirectory
            let fileURL = directory.appendingPathComponent("\(key).json")
            
            do {
                let data = try JSONEncoder().encode(object)
                try data.write(to: fileURL)
            } catch {
                print("[KHDataStore] 保存失败: \(error)")
            }
        }
    }
    
    func loadObject<T: Codable>(forKey key: String, type: T.Type, fromCache: Bool = false) -> T? {
        let directory = fromCache ? cacheDirectory : documentDirectory
        let fileURL = directory.appendingPathComponent("\(key).json")
        
        guard let data = try? Data(contentsOf: fileURL) else { return nil }
        return try? JSONDecoder().decode(type, from: data)
    }
    
    func removeObject(forKey key: String, fromCache: Bool = false) {
        queue.async {
            let directory = fromCache ? self.cacheDirectory : self.documentDirectory
            let fileURL = directory.appendingPathComponent("\(key).json")
            try? self.fileManager.removeItem(at: fileURL)
        }
    }
    
    // MARK: - 批量操作
    
    func saveBatch<T: Codable>(_ objects: [T], prefix: String) {
        queue.async {
            objects.enumerated().forEach { index, object in
                self.saveObject(object, forKey: "\(prefix)_\(index)")
            }
        }
    }
    
    // MARK: - 缓存清理
    
    private func setupPeriodicCleanup() {
        Timer.scheduledTimer(withTimeInterval: 3600, repeats: true) { [weak self] _ in
            self?.cleanupExpiredCache()
        }
    }
    
    private func cleanupExpiredCache() {
        queue.async {
            guard let files = try? self.fileManager.contentsOfDirectory(at: self.cacheDirectory, includingPropertiesForKeys: [.contentModificationDateKey]) else { return }
            
            let now = Date()
            let expirationInterval: TimeInterval = 7 * 24 * 3600 // 7天
            
            for file in files {
                guard let attributes = try? self.fileManager.attributesOfItem(atPath: file.path),
                      let modificationDate = attributes[.modificationDate] as? Date else { continue }
                
                if now.timeIntervalSince(modificationDate) > expirationInterval {
                    try? self.fileManager.removeItem(at: file)
                }
            }
        }
    }
    
    // MARK: - 统计信息
    
    func getStorageStats() -> [String: Int64] {
        var stats: [String: Int64] = [:]
        
        stats["cacheSize"] = calculateDirectorySize(cacheDirectory)
        stats["documentSize"] = calculateDirectorySize(documentDirectory)
        
        return stats
    }
    
    private func calculateDirectorySize(_ url: URL) -> Int64 {
        guard let files = try? fileManager.contentsOfDirectory(at: url, includingPropertiesForKeys: [.fileSizeKey]) else { return 0 }
        
        return files.reduce(0) { total, file in
            guard let attributes = try? fileManager.attributesOfItem(atPath: file.path),
                  let size = attributes[.size] as? Int64 else { return total }
            return total + size
        }
    }
}

// MARK: - 加密存储

extension KHDataStore {
    
    func saveSecureData(_ data: Data, forKey key: String) {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: key,
            kSecValueData as String: data,
            kSecAttrAccessible as String: kSecAttrAccessibleAfterFirstUnlock
        ]
        
        SecItemDelete(query as CFDictionary)
        SecItemAdd(query as CFDictionary, nil)
    }
    
    func loadSecureData(forKey key: String) -> Data? {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: key,
            kSecReturnData as String: true,
            kSecMatchLimit as String: kSecMatchLimitOne
        ]
        
        var result: AnyObject?
        SecItemCopyMatching(query as CFDictionary, &result)
        return result as? Data
    }
}
