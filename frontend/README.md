# ユーザー・物件管理アプリ（JWT認証付きフルスタック）

## 概要
不動産の物件とユーザーを管理するWebアプリです。  
Spring Boot（バックエンド）とReact（フロントエンド）で構築しています。  
JWT認証によるログイン機能を実装し、認証付きCRUD操作が可能です。

本アプリでは以下の管理が可能です  
・ユーザー管理（CRUD / 検索）  
・物件管理（一覧 / 作成 / 削除）  

実務を意識した設計（レイヤードアーキテクチャ / DTO分離 / 例外処理）と、  
フロント・バックエンド分離構成でのAPI連携を重視しています。

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

## 🧩 システム構成

- Backend：Spring Boot（REST API + JWT認証）
- Frontend：React（Vite） + Axios
- Infrastructure：Render（Backend） / Vercel（Frontend）

---

## 🛠 使用技術

### Backend
- Java 17
- Spring Boot
- Spring Security
- JWT認証
- Spring Data JPA
- MySQL（Render）
- Maven
- Jakarta Validation

### Frontend
- React（Vite）
- Axios
- React Router

---

## 🏗 アーキテクチャ設計

レイヤードアーキテクチャを採用

Controller  
↓  
Service  
↓  
Repository  
↓  
Entity（DB）

### 設計方針
- Controllerは薄くし、ビジネスロジックはServiceに集約
- DTOを用いてEntityを外部公開しない設計
- GlobalExceptionHandlerで例外を統一管理
- Bean Validationで入力値検証

---

## 🔐 セキュリティ（JWT認証）

- /auth/login でトークン発行
- JwtFilterでリクエストごとに認証チェック
- /auth/** は認証不要
- その他APIはJWT必須
- トークン有効期限：1時間

Authorization: Bearer xxxxx

---

## 💻 フロントエンド設計

- Axios interceptorでJWTを自動付与
- 401エラー時に自動ログアウト
- React Routerで認証ガード実装
- Login / User / Propertyでページ責務を分離

---

## 📌 機能一覧

### 認証
- ログイン（JWT）

### ユーザー管理
- 一覧取得（ページング）
- 作成
- 更新
- 削除
- 名前検索

### 物件管理
- 一覧取得
- 作成
- 削除

---

## 📡 API仕様

### 認証
POST /auth/login

### ユーザー
POST /users  
GET /users  
GET /users/{id}  
PUT /users/{id}  
DELETE /users/{id}  
GET /users/search  

### 物件
POST /properties  
GET /properties  
GET /properties/{id}  
PUT /properties/{id}  
DELETE /properties/{id}  

---

## 💡 工夫した点（評価ポイント）

- JWT認証を実装し、ステートレスな認証方式を採用
- DTO・Service層分離により保守性を意識した設計
- GlobalExceptionHandlerでエラーを統一管理
- Axios interceptorでトークン自動付与
- フロント/バック分離構成でAPI連携を実装
- Render + Vercelでデプロイ経験
- CORS問題を実際に解決し、通信を実現

---

## 📈 成果

- フロントとバックエンドを分離した構成でアプリを一から構築
- JWT認証を用いたセキュアなAPI通信を実現
- 本番環境（Render / Vercel）へのデプロイまで完了

---

## ⚠ 苦労した点

- JWT認証フィルタの実装と認証状態管理
- CORSエラーの解決（本番環境）
- デプロイ時の環境変数設定
- フロントとバックのAPI接続

---

## 🚀 今後の改善

- UI/UXの改善
- リフレッシュトークンの導入
- Docker対応
- テストコード追加（Service層）
- 物件編集機能の追加

---

## ▶ 起動方法

### Backend
cd backend  
./mvnw spring-boot:run  

### Frontend
cd frontend  
npm install  
npm run dev  