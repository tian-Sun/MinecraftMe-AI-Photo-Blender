module.exports = {

"[project]/.next-internal/server/app/api/remove-background/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/app/api/remove-background/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$replicate$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/replicate/index.js [app-route] (ecmascript)");
;
;
const replicate = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$replicate$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]({
    auth: process.env.REPLICATE_API_TOKEN
});
const MODEL_VERSION = "f74986db0355b58403ed20963af156525e2891ea3c2d499bfbfb2a28cd87c5d7";
function isReadableStream(obj) {
    return obj && typeof obj.getReader === "function";
}
// 正确处理图片流为 Buffer
async function streamToBuffer(stream) {
    const reader = stream.getReader();
    const chunks = [];
    while(true){
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
    }
    return Buffer.concat(chunks);
}
async function POST(request) {
    console.log("🚀 开始处理背景移除请求");
    try {
        const formData = await request.formData();
        const file = formData.get("image");
        if (!file) {
            console.log("❌ 未提供图片文件");
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "No image file provided"
            }, {
                status: 400
            });
        }
        console.log("📝 接收到图片文件:", {
            name: file.name,
            type: file.type,
            size: file.size
        });
        // 如果没有配置 API token，返回演示模式响应
        if (!process.env.REPLICATE_API_TOKEN) {
            console.log("⚠️ 未配置 API token，使用演示模式");
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                result: "/demo/person.png",
                message: "Running in demo mode - using sample image"
            });
        }
        // 将文件转换为 base64
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64Image = buffer.toString("base64");
        const dataUrl = `data:${file.type};base64,${base64Image}`;
        console.log("✅ 图片已转换为 base64");
        // 调用 Replicate API 移除背景
        console.log("🔄 正在调用 Replicate API...");
        try {
            let output = await replicate.run("cjwbw/rembg:f74986db0355b58403ed20963af156525e2891ea3c2d499bfbfb2a28cd87c5d7", {
                input: {
                    image: dataUrl
                }
            });
            // 兼容 ReadableStream 返回，转 Buffer 再转 base64
            if (isReadableStream(output)) {
                const buffer = await streamToBuffer(output);
                output = buffer.toString("base64");
                console.log("【LOG】output 已从 ReadableStream 转为 base64，前30字符:", output.slice(0, 30));
            }
            // 只对 base64 字符串加前缀
            if (typeof output === "string" && !output.startsWith("data:image/png;base64,")) {
                output = `data:image/png;base64,${output}`;
                console.log("【LOG】output 已加前缀，前30字符:", output.slice(0, 30));
            }
            console.log("【LOG】最终返回 output 前100字符:", typeof output === "string" ? output.slice(0, 100) : output);
            // 如果输出是 URL，获取图片内容并转换为 base64
            if (typeof output === "string" && output.startsWith("http")) {
                console.log("📥 正在获取远程图片数据...");
                const imageResponse = await fetch(output);
                const arrayBuffer = await imageResponse.arrayBuffer();
                const base64 = Buffer.from(arrayBuffer).toString("base64");
                const resultDataUrl = `data:image/png;base64,${base64}`;
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true,
                    result: resultDataUrl
                });
            }
            // 如果输出已经是 base64 或其他格式，直接返回
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                result: output
            });
        } catch (apiError) {
            console.error("❌ Replicate API 错误:", apiError);
            throw new Error(`Replicate API 错误: ${apiError instanceof Error ? apiError.message : String(apiError)}`);
        }
    } catch (error) {
        console.error("❌ 背景移除错误:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Background removal failed",
            details: error instanceof Error ? error.message : String(error)
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__6b2a483d._.js.map