import React from "react";
import RequestTokens from "./components/RequestTokens"; // นำเข้า RequestTokens Component
import './index.css'; // นำเข้าไฟล์ CSS ที่เราตั้งค่า Tailwind

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-6">Request GToken</h1>
        {/* เรียกใช้งาน RequestTokens component */}
        <RequestTokens />
      </div>
    </div>
  );
};

export default App;
