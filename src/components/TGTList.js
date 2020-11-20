import { useState } from "react";
import React from "react";

function TGTList() {
  const [result, setResult] = useState("まだ実行されていないよ");
  const doAPI = async () => {
    const url = "http://localhost:8080";
    let res;
    try {
      res = await fetch(url, {
        method: "GET",
      });
    } catch {
      res = "API実行に失敗しています。";
    }
    setResult(res);
  };

  return (
    <>
      <button
        onClick={() => {
          doAPI();
        }}
      >
        test
      </button>
      <div>{result}</div>
    </>
  );
}

export default TGTList;
