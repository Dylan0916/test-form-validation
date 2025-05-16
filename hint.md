你是一名資深的前端工程師+架構師，請實作表單驗證架構，並且完成以下需求：
1. 使用 `yup` + `vee-validate`
2. 表單欄位驗證規則請參考下方表格。
3. 當有欄位錯誤時，請顯示錯誤訊息，並且輸入框 (input or select 等等) 外框變紅色，錯誤訊息文字你決定。
4. 當所有欄位驗證通過時，請顯示 `success`。
5. 適當的抽象化，各個 components、composables、utils、constants 分乾淨。
6. 使用最新的 vue3 + typescript 寫法。
7. 我想使用 `useField` 來實作，但不要有幾個欄位就幾個 `useField` 的方式，請用一個 component 來包裝所有的欄位，並使用 `props.name` 搭配 `v-if` 來判斷要渲染什麼。
```
| 欄位代碼                    | 顯示名稱    | 類型       | 條件規則描述                                            |
| ----------------------- | ------- | -------- | ------------------------------------------------- |
| `planType`              | 方案類型    | select   | 若選擇 `"custom"`，則 `customPlanName` 為必填             |
| `customPlanName`        | 自訂方案名稱  | text     | 當 `planType === "custom"` 時必填                     |
| `startDate`             | 服務開始時間  | date     | 必填                                                |
| `endDate`               | 服務結束時間  | date     | 若 `hasEndDate === true` 時為必填                      |
| `hasEndDate`            | 是否有結束時間 | checkbox | 若勾選，則 `endDate` 必填                                |
| `isPublic`              | 是否公開    | checkbox | 若為 `false`，則 `accessCode` 為必填                     |
| `accessCode`            | 存取代碼    | text     | 當 `isPublic === false` 時必填                        |
| `pricingModel`          | 價格模式    | select   | 若為 `"tiered"`，則需填 `tierPricing` 欄位                |
| `tierPricing`           | 分級價格設定  | array    | 當 `pricingModel === "tiered"` 時必填                 |
| `currency`              | 幣別      | select   | 必填                                                |
| `price`                 | 售價      | number   | 必填，且需 > 0                                         |
| `cost`                  | 成本      | number   | 選填，若有填，需 `< price`                                |
| `commissionType`        | 抽成類型    | select   | 若為 `"percentage"`，則 `commissionRate` 為必填          |
| `commissionRate`        | 抽成百分比   | number   | 當 `commissionType === "percentage"` 時必填，範圍 0\~100 |
| `enableLimit`           | 啟用人數上限  | checkbox | 若勾選，`maxPeople` 為必填                               |
| `maxPeople`             | 最大人數限制  | number   | 當 `enableLimit === true` 時必填，且需 > 0               |
| `enableTimeRange`       | 限制預約時段  | checkbox | 若勾選，`availableTimes` 為必填                          |
| `availableTimes`        | 可預約時段列表 | array    | 當 `enableTimeRange === true` 時必填                  |
| `requireIDVerification` | 需身分驗證   | checkbox | 若勾選，`idType` 為必填                                  |
| `idType`                | 驗證身分方式  | select   | 當 `requireIDVerification === true` 時必填            |
```