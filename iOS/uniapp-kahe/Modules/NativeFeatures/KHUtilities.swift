//
//  KHUtilities.swift
//  卡核潮玩 - 工具类
//

import UIKit
import CryptoKit
import CommonCrypto

/// 通用工具类
struct KHUtilities {
    
    // MARK: - 字符串处理
    
    static func md5(_ string: String) -> String {
        let data = Data(string.utf8)
        var digest = [UInt8](repeating: 0, count: Int(CC_MD5_DIGEST_LENGTH))
        
        data.withUnsafeBytes { buffer in
            CC_MD5(buffer.baseAddress, CC_LONG(data.count), &digest)
        }
        
        return digest.map { String(format: "%02hhx", $0) }.joined()
    }
    
    static func sha256(_ string: String) -> String {
        let data = Data(string.utf8)
        var digest = [UInt8](repeating: 0, count: Int(CC_SHA256_DIGEST_LENGTH))
        
        data.withUnsafeBytes { buffer in
            CC_SHA256(buffer.baseAddress, CC_LONG(data.count), &digest)
        }
        
        return digest.map { String(format: "%02hhx", $0) }.joined()
    }
    
    // MARK: - 日期格式化
    
    static func formatDate(_ date: Date, style: DateFormatter.Style = .medium) -> String {
        let formatter = DateFormatter()
        formatter.dateStyle = style
        formatter.timeStyle = .short
        formatter.locale = Locale(identifier: "zh_CN")
        return formatter.string(from: date)
    }
    
    static func timeAgo(from date: Date) -> String {
        let interval = Date().timeIntervalSince(date)
        
        switch interval {
        case 0..<60:
            return "刚刚"
        case 60..<3600:
            return "\(Int(interval / 60))分钟前"
        case 3600..<86400:
            return "\(Int(interval / 3600))小时前"
        case 86400..<604800:
            return "\(Int(interval / 86400))天前"
        default:
            return formatDate(date)
        }
    }
    
    // MARK: - 设备信息
    
    static func generateDeviceFingerprint() -> String {
        let device = UIDevice.current
        var components: [String] = [
            device.name,
            device.model,
            device.systemVersion,
            device.identifierForVendor?.uuidString ?? UUID().uuidString
        ]
        
        let screen = UIScreen.main
        components.append("\(screen.bounds.width)x\(screen.bounds.height)")
        components.append("\(screen.scale)")
        
        return sha256(components.joined(separator: "|"))
    }
    
    // MARK: - 图片处理
    
    static func compressImage(_ image: UIImage, maxSize: CGFloat = 1024, quality: CGFloat = 0.8) -> Data? {
        var newSize = image.size
        
        let scale = max(image.size.width, image.size.height) / maxSize
        if scale > 1 {
            newSize = CGSize(width: image.size.width / scale, height: image.size.height / scale)
        }
        
        UIGraphicsBeginImageContextWithOptions(newSize, false, 1.0)
        image.draw(in: CGRect(origin: .zero, size: newSize))
        let resizedImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        
        return resizedImage?.jpegData(compressionQuality: quality)
    }
    
    // MARK: - 验证
    
    static func isValidEmail(_ email: String) -> Bool {
        let regex = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}"
        return NSPredicate(format: "SELF MATCHES %@", regex).evaluate(with: email)
    }
    
    static func isValidPhone(_ phone: String) -> Bool {
        let regex = "^1[3-9]\\d{9}$"
        return NSPredicate(format: "SELF MATCHES %@", regex).evaluate(with: phone)
    }
}

// MARK: - 扩展

extension UIColor {
    convenience init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        
        let a, r, g, b: UInt64
        switch hex.count {
        case 3:
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6:
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8:
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 0, 0)
        }
        
        self.init(red: Double(r) / 255, green: Double(g) / 255, blue: Double(b) / 255, alpha: Double(a) / 255)
    }
}

extension String {
    var localized: String {
        return NSLocalizedString(self, comment: "")
    }
}
