import { useState } from "react";
import CryptoJS from "crypto-js";

const translations = {
  en: {
    title: "Data Encryption",
    inputLabel: "Input Data",
    caesarShiftLabel: "Caesar Shift",
    encryptButton: "Encrypt",
    decryptButton: "Decrypt",
    encryptedDataTitle: "Encrypted Data",
    decryptedDataTitle: "Decrypted Data",
    explanationTitle: "Explanation:",
    policy:
      "Application Policy:\n\n1. The entered data belongs to the user and is not stored.\n2. This application is not responsible for the misuse of encrypted data.\n3. Ensure not to use sensitive data without adequate encryption.",
    errorEmptyInput: "Input data cannot be empty",
    errorDecryption:
      "Error during decryption. Please ensure the correct encrypted data is provided.",
    copySuccess: "Copied to clipboard!",
    dataDescription: {
      aes: "AES (Advanced Encryption Standard): A widely used symmetric encryption algorithm.",
      des: "DES (Data Encryption Standard): An older symmetric encryption algorithm, now replaced by AES but still used in some legacy applications.",
      caesar:
        "Caesar Cipher: A simple encryption technique that shifts letters in the text by a certain amount, often used to demonstrate basic encryption concepts.",
    },
  },
  id: {
    title: "Enkripsi Data",
    inputLabel: "Input Data",
    caesarShiftLabel: "Geser Caesar",
    encryptButton: "Enkripsi",
    decryptButton: "Dekripsi",
    encryptedDataTitle: "Data Terenkripsi",
    decryptedDataTitle: "Data Terdekripsi",
    explanationTitle: "Penjelasan:",
    policy:
      "Kebijakan Aplikasi:\n\n1. Data yang dimasukkan adalah milik pengguna dan tidak disimpan.\n2. Aplikasi ini tidak bertanggung jawab atas penyalahgunaan data yang dienkripsi.\n3. Pastikan untuk tidak menggunakan data sensitif tanpa enkripsi yang memadai.",
    errorEmptyInput: "Input data tidak boleh kosong",
    errorDecryption:
      "Error saat dekripsi. Pastikan data terenkripsi yang benar diberikan.",
    copySuccess: "Disalin ke clipboard!",
    dataDescription: {
      aes: "AES (Advanced Encryption Standard): Algoritma enkripsi simetris yang digunakan secara luas dalam berbagai aplikasi keamanan.",
      des: "DES (Data Encryption Standard): Algoritma enkripsi simetris yang lebih lama, kini digantikan oleh AES namun masih digunakan dalam beberapa aplikasi legacy.",
      caesar:
        "Caesar Cipher: Teknik enkripsi sederhana yang menggeser huruf dalam teks dengan jumlah tertentu, sering digunakan untuk demonstrasi konsep enkripsi dasar.",
    },
  },
};

const FormInput = () => {
  const [inputData, setInputData] = useState("");
  const [shift, setShift] = useState(3);
  const [encryptedData, setEncryptedData] = useState({
    aes: "",
    des: "",
    caesar: "",
  });
  const [decryptedData, setDecryptedData] = useState({
    aes: "",
    des: "",
    caesar: "",
  });
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("id"); // Default to Indonesian

  const handleEncrypt = () => {
    if (!inputData) {
      setError(translations[language].errorEmptyInput);
      return;
    }

    const aesEncrypted = CryptoJS.AES.encrypt(
      inputData,
      "secret key 123"
    ).toString();
    const desEncrypted = CryptoJS.DES.encrypt(
      inputData,
      "secret key 123"
    ).toString();
    const caesarEncrypted = caesarCipher(inputData, shift);

    setEncryptedData({
      aes: aesEncrypted,
      des: desEncrypted,
      caesar: caesarEncrypted,
    });
    setError("");
  };

  const handleDecrypt = () => {
    if (!inputData) {
      setError(translations[language].errorEmptyInput);
      return;
    }

    try {
      const aesDecrypted = CryptoJS.AES.decrypt(
        encryptedData.aes,
        "secret key 123"
      ).toString(CryptoJS.enc.Utf8);
      const desDecrypted = CryptoJS.DES.decrypt(
        encryptedData.des,
        "secret key 123"
      ).toString(CryptoJS.enc.Utf8);
      const caesarDecrypted = caesarCipher(encryptedData.caesar, -shift);

      setDecryptedData({
        aes: aesDecrypted,
        des: desDecrypted,
        caesar: caesarDecrypted,
      });
      setError("");
    } catch (error) {
      setError(translations[language].errorDecryption);
    }
  };

  const caesarCipher = (str, shift) => {
    return str.replace(/[a-z]/gi, (char) => {
      const start = char <= "Z" ? 65 : 97;
      return String.fromCharCode(
        start + ((char.charCodeAt(0) - start + shift + 26) % 26)
      );
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleEncrypt();
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert(translations[language].copySuccess);
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  const showPolicy = () => {
    alert(translations[language].policy);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "id" ? "en" : "id"));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1
        className="text-2xl font-bold mb-4"
        onClick={() => window.location.reload()}
      >
        {translations[language].title}
      </h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {translations[language].inputLabel}
        </label>
        <textarea
          id="inputData"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          onKeyPress={handleKeyPress}
          rows="5"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
        {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {translations[language].caesarShiftLabel}
        </label>
        <input
          type="number"
          value={shift}
          onChange={(e) => setShift(Number(e.target.value))}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        onClick={handleEncrypt}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
      >
        {translations[language].encryptButton}
      </button>
      <button
        onClick={handleDecrypt}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {translations[language].decryptButton}
      </button>
      <button
        onClick={toggleLanguage}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
      >
        {language === "id" ? "English" : "Bahasa Indonesia"}
      </button>
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">
          {translations[language].encryptedDataTitle}
        </h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300">Method</th>
              <th className="py-2 px-4 border-b border-gray-300">
                Encrypted Data
              </th>
              <th className="py-2 px-4 border-b border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {["aes", "des", "caesar"].map((method) => (
              <tr key={method}>
                <td className="py-2 px-4 border-b border-gray-300">
                  {method.toUpperCase()}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 break-all">
                  {encryptedData[method]}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <button
                    onClick={() => copyToClipboard(encryptedData[method])}
                    className="text-blue-500"
                  >
                    Copy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className="text-lg font-semibold mt-4">
          {translations[language].decryptedDataTitle}
        </h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300">Method</th>
              <th className="py-2 px-4 border-b border-gray-300">
                Decrypted Data
              </th>
              <th className="py-2 px-4 border-b border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {["aes", "des", "caesar"].map((method) => (
              <tr key={method}>
                <td className="py-2 px-4 border-b border-gray-300">
                  {method.toUpperCase()}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 break-all">
                  {decryptedData[method]}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <button
                    onClick={() => copyToClipboard(decryptedData[method])}
                    className="text-blue-500"
                  >
                    Copy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className="text-xl font-semibold mt-4">
          {translations[language].explanationTitle}
        </h2>
        <div className="mt-2 text-gray-700">
          <p className="mb-2">
            {language === "id"
              ? "Enkripsi adalah proses mengamankan data dengan mengubahnya menjadi bentuk yang tidak dapat dibaca tanpa bantuan algoritma enkripsi yang tepat."
              : "Encryption is the process of securing data by transforming it into an unreadable format without the proper encryption algorithm."}
          </p>
          <ul className="list-disc list-inside">
            <li>
              <strong>AES</strong>: {translations[language].dataDescription.aes}
            </li>
            <li>
              <strong>DES</strong>: {translations[language].dataDescription.des}
            </li>
            <li>
              <strong>Caesar Cipher</strong>:{" "}
              {translations[language].dataDescription.caesar}
            </li>
          </ul>
        </div>
      </div>
      <footer className="mt-4 text-center text-gray-700">
        {language === "id"
          ? "Web ini dibangun oleh:"
          : "This website is built by:"}{" "}
        <a
          href="https://github.com/AlpianPPLG"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Alpian{" "}
          <span
            onClick={showPolicy}
            className="cursor-pointer text-blue-500 hover:underline"
          >
            | Kebijakan
          </span>
        </a>
      </footer>
    </div>
  );
};

export default FormInput;
