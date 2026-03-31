ユーザー管理アプリ（JWT認証付きフルスタック）
概要

Spring Boot（バックエンド）とReact（フロントエンド）で構築したユーザー管理アプリです。
JWT認証を用いたログイン機能を実装し、認証付きCRUD APIの操作が可能です。

本プロジェクトは、実務を意識した設計（レイヤードアーキテクチャ・DTO分離・例外処理）と、フロント/バック分離構成でのAPI連携を目的に開発しました。

🌐 デモ（実際に触れます）

フロント：https://user-crud-app-dusky.vercel.app

API（Swagger）：https://user-management-api-bhn3.onrender.com/swagger-ui/index.html

ログイン情報
username: admin
password: admin

システム構成

backend : Spring Boot（REST API + JWT認証）
frontend : React（Vite） + Axios
infra : Render（Backend） / Vercel（Frontend）

使用技術
Backend

Java 17
Spring Boot
Spring Security
JWT認証
Spring Data JPA
MySQL（Render）
Maven
Jakarta Validation

Frontend

React（Vite）
Axios
React Router

アーキテクチャ設計

レイヤードアーキテクチャを採用し、責務を明確に分離しています。

Controller
↓
Service
↓
Repository
↓
Entity（DB）

設計方針

・Controllerは薄く保ち、ビジネスロジックはServiceに集約
・DTOを用いてEntityを外部公開しない設計
・GlobalExceptionHandlerで例外を統一管理
・Bean Validationで入力値検証を実施

セキュリティ（JWT認証）

・/auth/login でトークン発行
・JwtFilterでリクエストごとに認証チェック
・/auth/** は認証不要
・その他APIはJWT必須
・トークン有効期限：1時間

Authorization: Bearer xxxxx

フロントエンド設計

・Axios interceptorでJWTを自動付与
・401エラー時に自動ログアウト
・React Routerで認証ガード実装
・Login / Userでページ責務を分離

機能一覧

・ログイン（JWT認証）
・ユーザー一覧取得（ページング）
・ユーザー作成
・ユーザー更新
・ユーザー削除
・名前検索
・ログアウト

API仕様

POST /auth/login → ログイン
POST /users → ユーザー作成
GET /users → 一覧取得
GET /users/{id} → 詳細
PUT /users/{id} → 更新
DELETE /users/{id} → 削除
GET /users/search → 検索

工夫した点（評価ポイント）

・JWT認証を実装し、ステートレスな認証方式を採用
・DTO・Service層分離により保守性を意識した設計
・GlobalExceptionHandlerでエラーを統一管理
・Axios interceptorでトークン自動付与
・フロント/バック分離構成でAPI連携を実装
・Render + Vercelで本番デプロイ経験
・CORS問題を実際に解決し、フロント・バック間通信を実現

苦労した点

・JWT認証フィルタの実装と認証状態管理
・CORSエラーの解決（本番環境で発生）
・デプロイ時の環境変数設定とAPI接続

今後の改善

・UI/UXの改善
・リフレッシュトークンの導入
・Docker対応
・テストコード拡充（Service層）

起動方法

Backend
cd backend
./mvnw spring-boot:run

Frontend
cd frontend
npm install
npm run dev