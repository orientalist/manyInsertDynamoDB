```markdown
# Node.js DynamoDB Survey Handler

## 簡介
這是一個使用 Node.js 和 AWS SDK 來處理問卷調查數據的 Lambda 函數。該函數從 API 獲取數據，解析後將結果存儲到 AWS DynamoDB 中。它主要用於收集和處理用戶的問卷調查反饋，並將其以結構化的方式存儲在雲端資料庫中。

## 功能
- 從問卷調查 API 獲取數據
- 解析響應數據，並按需格式化
- 將處理後的數據存儲到 AWS DynamoDB
- 支援多種問卷數據類型的處理
- 返回處理狀態的回應

## 安裝與使用方式
1. 確保您已安裝 [Node.js](https://nodejs.org/)。
2. 下載或克隆此庫至本地。
3. 使用 npm 安裝必要的依賴：
   ```bash
   npm install @aws-sdk/client-dynamodb node-fetch
   ```
4. 配置 AWS 認證：
   - 在程式碼中填寫適當的 `accessKeyId` 和 `secretAccessKey`，並設定相應的 AWS 區域。
5. 部署此函數至 AWS Lambda。
6. 根據應用需求測試和調用 Lambda 函數。

## 必要的依賴模組清單
- `@aws-sdk/client-dynamodb`: 用於與 AWS DynamoDB 互動的 SDK。
- `node-fetch`: 用於進行 HTTP 請求的輕量級模組。

## 授權條款
本專案採用 [MIT](https://opensource.org/licenses/MIT) 開源授權條款。請隨意使用和修改，但請在使用過程中保持原始授權聲明和上述授權條款。