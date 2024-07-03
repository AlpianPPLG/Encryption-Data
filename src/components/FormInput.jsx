import { useState } from "react";
import CryptoJS from "crypto-js";

const FormInput = () => {
  const [inputData, setInputData] = useState("");
  const [encryptedData, setEncryptedData] = useState({
    aes: "",
    des: "",
    caesar: "",
  });
  const [error, setError] = useState("");

  const handleEncrypt = () => {
    if (!inputData) {
      setError("Input data tidak boleh kosong");
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
    const caesarEncrypted = caesarCipher(inputData, 3);

    setEncryptedData({
      aes: aesEncrypted,
      des: desEncrypted,
      caesar: caesarEncrypted,
    });

    setError(""); // Clear the error message after successful encryption
  };

  const caesarCipher = (str, shift) => {
    return str.replace(/[a-z]/gi, (char) => {
      const start = char <= "Z" ? 65 : 97;
      return String.fromCharCode(
        start + ((char.charCodeAt(0) - start + shift) % 26)
      );
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleEncrypt();
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1
        className="text-2xl font-bold mb-4"
        onClick={() => window.location.reload()}
      >
        Enkripsi Data
      </h1>
      <div className="mb-4">
        <a href="#" className="block text-gray-700 text-sm font-bold mb-2">
          Input Data
        </a>
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
      <button
        onClick={handleEncrypt}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Encrypt
      </button>
      <div className="mt-4">
        <p className="text-gray-700 mb-2">
          Web ini dibangun oleh Alpian. Ini adalah aplikasi sederhana untuk
          mengenkripsi data menggunakan beberapa algoritma enkripsi umum.
        </p>
        <h2 className="text-lg font-semibold mb-2">Encrypted Data</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300">Method</th>
              <th className="py-2 px-4 border-b border-gray-300">
                Encrypted Data
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b border-gray-300">AES</td>
              <td className="py-2 px-4 border-b border-gray-300 break-all">
                {encryptedData.aes}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-300">DES</td>
              <td className="py-2 px-4 border-b border-gray-300 break-all">
                {encryptedData.des}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-300">
                Caesar Cipher
              </td>
              <td className="py-2 px-4 border-b border-gray-300 break-all">
                {encryptedData.caesar}
              </td>
            </tr>
          </tbody>
        </table>
        <h2 className="text-xl font-semibold mt-4">Penjelasan:</h2>
        <div className="mt-2 text-gray-700">
          <p className="mb-2">
            Enkripsi adalah proses mengamankan data dengan mengubahnya menjadi
            bentuk yang tidak dapat dibaca tanpa bantuan algoritma enkripsi yang
            tepat. Teknik yang digunakan dalam contoh ini adalah:
          </p>
          <ul className="list-disc list-inside">
            <li>
              <strong>AES</strong> (Advanced Encryption Standard): Algoritma
              enkripsi simetris yang digunakan secara luas dalam berbagai
              aplikasi keamanan.
            </li>
            <li>
              <strong>DES</strong> (Data Encryption Standard): Algoritma
              enkripsi simetris yang lebih lama, kini digantikan oleh AES namun
              masih digunakan dalam beberapa aplikasi legacy.
            </li>
            <li>
              <strong>Caesar Cipher</strong>: Teknik enkripsi sederhana yang
              menggeser huruf dalam teks dengan jumlah tertentu, sering
              digunakan untuk demonstrasi konsep enkripsi dasar.
            </li>
          </ul>
        </div>
      </div>
      <footer className="mt-4 text-center text-gray-700">
        Web ini dibangun oleh:{" "}
        <a
          href="https://github.com/AlpianPPLG"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Alpian
        </a>
      </footer>
    </div>
  );
};

export default FormInput;
