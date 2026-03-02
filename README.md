# User Management API

## 概要
Spring Bootを用いて作成したユーザー管理APIです。
CRUD機能を実装し、実務を想定したレイヤードアーキテクチャ構成で設計しました。
実務での保守性・拡張性を意識し、責務分離・例外統一・入力検証を取り入れた設計としました。

## 設計方針
- Controllerは可能な限り薄く保つ
- ビジネスロジックはService層に集約する
- Entityは外部に公開しない
- 例外処理は共通ハンドラーで統一する
- 入力値検証はBean Validationで実施する

## 使用技術
- Java
- Spring Boot
- Maven
- MySQL
- Spring Data JPA
- Lombok
- Jakarta Validation
- Git / GitHub

## アーキテクチャ設計
- 本プロジェクトはレイヤードアーキテクチャを採用しています。

## Controller層
- HTTPリクエストの受付
- Entityの直接公開を防ぎ、責務を明確にするためDTOを使用
- バリデーション実施
- ビジネスロジックは持たない

## Service層
- 業務ロジックを集約
- Repositoryとの橋渡し
- 例外スローの責務を持つ

## Repository層
- データベースアクセスのみ担当
- Spring Data JPAを使用

## DTO
- Create / Update を分離
- Entityを直接外部に公開しない設計

## 例外処理
- GlobalExceptionHandlerで例外を一元管理
- 想定外エラーと業務例外を分離

## API仕様

| Method | Endpoint | 内容 |
|--------|----------|------|
| POST   | /users   | ユーザー作成 |
| GET    | /users   | 全件取得 |
| GET    | /users/{id} | 1件取得 |
| PUT    | /users/{id} | 更新 |
| DELETE | /users/{id} | 削除 |

## データベース
- MySQLを使用。

## 主なカラム：
- id
- name
- email

## 工夫した点（実装面）
- DTOを用途別に分離（Create / Update）
- GlobalExceptionHandlerで例外を一元管理
- Bean Validationで入力検証を実施
- Service層に業務ロジックを集約

## 今後の改善予定
- APIレスポンス形式の統一
- テストコード（MockMvc）の追加
- ログ設計の強化