# ユーザー・物件管理アプリ（JWT認証付きフルスタック）

## 🎯 ポイント

JWT認証付きのフルスタックアプリとして、バックエンドからフロントエンドまで一貫して実装しました。  
認証・CRUD・例外処理・API連携・デプロイまで対応しています。

---

## 🌐 デモ（実際に操作可能）

フロント  
https://user-crud-app-dusky.vercel.app

API（Swagger）  
https://user-management-api-bhn3.onrender.com/swagger-ui/index.html

### ログイン情報
username: admin  
password: admin  

---

## 📸 画面イメージ（ここに貼る）

### ログイン画面
👉 ここにスクショ貼る

### ユーザー一覧
👉 ここにスクショ貼る

### 物件一覧
👉 ここにスクショ貼る

---

## 🧩 システム構成

- Backend：Spring Boot（REST API + JWT認証）
- Frontend：React（Vite） + Axios
- Infrastructure：Render / Vercel

---

## 🛠 使用技術

### Backend
- Java 17
- Spring Boot
- Spring Security
- JWT認証
- Spring Data JPA
- MySQL
- Maven
- Jakarta Validation

### Frontend
- React（Vite）
- Axios
- React Router

---

## 🏗 アーキテクチャ

Controller  
↓  
Service  
↓  
Repository  
↓  
Entity（DB）

---

## 🔐 認証（JWT）

- /auth/login でトークン発行
- JWTをヘッダーに付与してAPI通信
- /auth/** は認証不要
- その他APIは認証必須

---

## 💻 フロント設計

- Axios interceptorでJWT自動付与
- 401で自動ログアウト
- React Routerで認証ガード

---

## 📌 機能

### 認証
- ログイン

### ユーザー
- CRUD
- 検索
- ページング

### 物件
- 作成
- 一覧
- 更新
- 削除

---

## 📡 API

POST /auth/login  

POST /users  
GET /users  
PUT /users/{id}  
DELETE /users/{id}  

POST /properties  
GET /properties  
PUT /properties/{id}  
DELETE /properties/{id}  

---

## 💡 工夫した点

- JWT認証の実装
- DTOでEntity非公開
- GlobalExceptionHandlerで統一エラー処理
- フロント/バック分離構成
- Axios interceptorでトークン自動付与
- デプロイ（Render / Vercel）

---

## ⚠ 苦労した点

- JWT認証の仕組み理解
- CORSエラー対応
- デプロイ時のAPI接続

---

## 🚀 今後

- UI改善
- テスト追加
- Docker対応

---

## ▶ 起動方法

### Backend
cd backend  
./mvnw spring-boot:run  

### Frontend
cd frontend  
npm install  
npm run dev  