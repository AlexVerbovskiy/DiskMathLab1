import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { useState, useEffect } from 'react';
import { operate } from "../utils/operations"

type TProps = {
  plural1?: string,
  plural2?: string,
  operation?: string
}

const Home: NextPage = () => {

  const { register, handleSubmit, setValue } = useForm({ shouldUseNativeValidation: true });
  const [res, setRes] = useState<string | null>("");
  const [img, setImg] = useState<string | null>("");
  const onSubmit = (data: TProps): void => {
    if (data.plural1 && data.plural2 && data.operation) {
      const resCalc = operate(data.plural1, data.plural2, data.operation);
      setRes(resCalc);
      switch (data.operation) {
        case "union": setImg("union.png"); break;
        case "cross section": setImg("cross.png"); break;
        case "difference": setImg("diff.jfif"); break;
        case "symmetrical difference": setImg("symmdiff.png"); break;
      }
    }
  };

  const onResClick = () => {
    setValue("plural1", res);
    setRes(null);
    setImg(null);
  }

  const onChange = () => {
    setRes(null);
    setImg(null);
  }

  const [name, setName] = useState<string | null>("");

  useEffect(() => {
    const actualName = typeof window === 'undefined' ? "default text" : localStorage.getItem("name");
    setName(actualName);
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Index</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <form onSubmit={handleSubmit(onSubmit)}>
          {'A = {  '}<input
            {...register("plural1", { required: "Please enter your first plural.", onChange })} // custom message
          />{'  }'}<br />
          {'B = {  '}<input
            {...register("plural2", { required: "Please enter your second plural.", onChange })} // custom message
          />{'  }'}<br />
          <select {...register("operation", { onChange })}>
            <option value="union">union</option>
            <option value="cross section">cross section</option>
            <option value="difference">difference</option>
            <option value="symmetrical difference">symmetrical difference</option>
          </select><br />
          <input type="submit" />
        </form>
        {res && <p onDoubleClick={onResClick}>C = {`{`}{res}{`}`}</p>}
        {img && <Image src={"/" + img} width={300} height={120} />}
      </Layout>
    </div>
  )
}

export default Home
