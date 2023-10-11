"use client";
import { queryAnswer, saveArticle } from "@/api";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { AlertCircle, FileWarning, Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertDestructive({ isVisible, errorMessage }) {
  if (!isVisible) {
    return null; // Return null to hide the component
  }

  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {errorMessage || "An error occurred."}{" "}
        {/* Use the provided error message or a default message */}
      </AlertDescription>
    </Alert>
  );
}

export default function Home() {
  const [articleValue, setArticleValue] = useState("");
  const [questionValue, setQuestionValue] = useState("");
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleArticleChange = (e) => {
    console.log("handleArticleChange" + e.target.value);
    setArticleValue(e.target.value);
  };

  const handleQuestionChange = (e) => {
    console.log("handleQuestionChange" + e.target.value);
    setQuestionValue(e.target.value);
  };

  const handleSaveArticleClick = () => {
    saveArticle(articleValue)
      .then((res) => {
        console.log("res.aid" + res.aid);
        aid = res.aid;
        localStorage.setItem("aid", aid);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.message);
        setIsErrorVisible(true);
      });
  };

  const handleQueryAnswerClick = () => {
    const aid = localStorage.getItem("aid");
    if (aid == null || aid === "") {
      console.log("dont have aid value" + aid);
      setErrorMessage("dont have aid value");
      setIsErrorVisible(true);
      return;
    }
    const param = {
      text: questionValue,
      aid: aid,
    };
    queryAnswer(param)
      .then((res) => {
        console.log(res);
        const ele = document.getElementById("qdrant");
        if (ele) {
          ele.innerText = JSON.stringify(res);
        } else {
          console.log("ele not exist");
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.message);
        setIsErrorVisible(true);
      });
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.js</code>
        </p>
      </div> */}
      <AlertDestructive
        isVisible={isErrorVisible}
        errorMessage={errorMessage}
      />

      <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        <h2 className="font-mono font-bold mb-3 text-2xl">
          English reading comprehension{" "}
        </h2>
      </div>

      <div className="grid w-full lg:grid-cols-2 gap-2">
        <div>
          <Textarea
            placeholder="Type article here."
            type="text"
            value={articleValue}
            onChange={handleArticleChange}
          />
          <div className="mt-10"></div>
          <Button type="button" onClick={handleSaveArticleClick}>
            Send
          </Button>
        </div>

        <div>
          <Textarea
            placeholder="Type questions and options here."
            type="text"
            value={questionValue}
            onChange={handleQuestionChange}
          />
          <div className="mt-10"></div>
          <Button type="button" onClick={handleQueryAnswerClick}>
            provide options
          </Button>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-1 lg:text-left">
        {/* <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a> */}

        {/* <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a> */}

        {/* <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore the Next.js 13 playground.
          </p>
        </a> */}

        <code className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <p id="qdrant" className={`m-0 max-w-full text-sm opacity-50`}>
            group rounded-lg border border-transparent px-5 py-4
            transition-colors hover:border-gray-300 hover:bg-gray-100
            hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30
          </p>
        </code>
      </div>
    </main>
  );
}
