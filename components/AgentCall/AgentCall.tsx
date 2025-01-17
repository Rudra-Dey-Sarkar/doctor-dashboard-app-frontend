"use client"
import React, { useState } from "react";
import { RetellWebClient } from "retell-client-js-sdk";
import { useForm } from "react-hook-form";

const retellWebClient = new RetellWebClient();


type CallOnPhoneDataType = {
  con_num: string,
  user_name: string,
  role: string,
  description: string
}

type CallOnWebDataType = {
  user_name: string,
  role: string,
  description: string
}

//Initiating call on certain Phone number with the AI Agent
async function InitiatePhoneCall(data: CallOnPhoneDataType, setCall: React.Dispatch<React.SetStateAction<boolean | null>>) {
  try {
    const response = await fetch("/api/phone-call", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    const rawResponse = await response.text();
    const datas = JSON.parse(rawResponse);

    if (response.ok) {
      console.log(datas?.message);
      setCall(true);
    } else {
      console.log(datas?.message);
      setCall(false);
    }

  } catch (error) {
    console.log("Cannot initiate call due to:-", error);
    setCall(false);
  }

}

//Initiating call on Web with the AI Agent
async function InitiateWebCall(data: CallOnWebDataType, setIsCallActive: React.Dispatch<React.SetStateAction<boolean>>) {
  try {
    const response = await fetch("/api/web-call", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }
    );

    const rawResponse = await response.text();
    const datas = JSON.parse(rawResponse);

    if (response.ok) {
      console.log(datas?.message, datas?.access_token);

      await retellWebClient.startCall({
        accessToken: datas?.access_token,
        sampleRate: 24000, // (Optional) set sample rate of the audio capture and playback
        // (Optional) device id of the mic.
        captureDeviceId: "default",
        // (Optional) device id of the speaker
        playbackDeviceId: "default",
        // (Optional) Whether to emit "audio" events that contain raw pcm audio bytes represented by Float32Array
        emitRawAudioSamples: false,
      }).then(() => {

        setIsCallActive(true);
        retellWebClient.on("call_started", () => {
          console.log("call started");
        });

        retellWebClient.on("call_ended", () => {
          console.log("call ended");
          setIsCallActive(false);
        });


        retellWebClient.on("error", (error) => {
          console.error("An error occurred:", error);
          retellWebClient.stopCall();
          setIsCallActive(false);
        });

      }).catch((errors) => {
        console.log("Cannot Connect the call due to :-", errors);
      });
    } else {
      console.log(datas?.message);
    }

  } catch (error) {
    console.log("Cannot initiate call due to:-", error);
  }

}

function AgentCall() {
  const [call, setCall] = useState<boolean | null>(null);
  const [isCallActive, setIsCallActive] = useState<boolean>(false);
  const [communication, setCommunication] = useState<string>("");

  const form = useForm<CallOnPhoneDataType>({
    defaultValues: {
      con_num: "",
      user_name: "",
      role: "",
      description: "",
    }
  });
  const { register, handleSubmit, formState: { errors } } = form;
  return (
    <div className="bg-gray-100 grid justify-center items-center p-2 gap-y-7 mb-5">
      <p className="text-[25px] text-center font-bold">Need Assitance ? Talk To Our Agents 👇🏼</p>
      <div className="sm:flex gap-x-2 grid gap-y-2">
        <button
          className={`${communication === "phone" ? "bg-green-100" : ""} border-2 border-gray-600  p-2 rounded-[5px] font-bold`}
          onClick={() => { setCommunication("phone") }}>Call Directly on Phone Number 📲</button>
        <button
          className={`${communication === "application" ? "bg-green-100" : ""} border-2 border-gray-600  p-2 rounded-[5px] font-bold`}
          onClick={() => { setCommunication("application") }}>Call Directly on Application 🖥️</button>
      </div>
      <div className="pb-5">
        {communication === "phone" ?
          <form onSubmit={handleSubmit((data) => {
            InitiatePhoneCall(data, setCall);
          })}
            className="grid w-fit m-auto border-2 border-gray-600 p-2 rounded-[5px]">
            <p
            className="text-[25px] font-bold border-2 border-gray-600 p-2 rounded-[5px] mb-2">Please Specify Your Details 👇🏼</p>
            <label
              htmlFor="contuct number"
              className="font-bold">Enter Your Contact Number :-</label>
            <input
              type="text"
              placeholder="+919999999999"
              {...register("con_num", { required: true })}
              className="border-2 border-gray-600 p-2 rounded-[5px]" />
            {errors?.con_num && <p className="text-[12px] text-red-500">Contact Number is Required to start the call</p>}

            <label
              htmlFor="contuct number"
              className="font-bold">Enter Your Username :-</label>
            <input
              type="text"
              placeholder="Alex"
              {...register("user_name", { required: true })}
              className="border-2 border-gray-600 p-2 rounded-[5px]" />
            {errors?.user_name && <p className="text-[12px] text-red-500">Username is Required to start the call</p>}

            <label
              htmlFor="contuct number"
              className="font-bold">Enter Your Role :-</label>
            <input
              type="text"
              placeholder="Doctor"
              {...register("role", { required: true })}
              className="border-2 border-gray-600 p-2 rounded-[5px]" />
            {errors?.role && <p className="text-[12px] text-red-500">Role is Required to start the call</p>}

            <label
              htmlFor="contuct number"
              className="font-bold">Enter Your Description :-</label>
            <input
              type="text"
              placeholder="I'm Medicine specialist Doctor"
              {...register("description", { required: true })}
              className="border-2 border-gray-600 p-2 rounded-[5px]" />
            {errors?.description && <p className="text-[12px] text-red-500">Description is Required to start the call</p>}
            <button className={`${call === null ? "bg-green-500" : call === true ? "bg-green-500" : "bg-red-500"} py-1 mt-2 text-white rounded-[5px] font-bold`}>{call === null ? "Start Call" : call === true ? "Calling" : "Call Did not connect"}</button>
          </form>
          : communication === "application" ?
            <div className="grid gap-y-2">
              {isCallActive === true &&
                <p className="font-bold text-center">
                  Speaking...
                </p>}

              <form onSubmit={handleSubmit((data) => {
                InitiateWebCall(data, setIsCallActive);
              })}
              className="grid w-fit m-auto border-2 border-gray-600 p-2 rounded-[5px]">
                <p
            className="text-[25px] font-bold border-2 border-gray-600 p-2 rounded-[5px] mb-2">Please Specify Your Details 👇🏼</p>
                <label
                  htmlFor="contuct number"
                  className="font-bold">Enter Your Username :-</label>
                <input
                  type="text"
                  placeholder="Alex"
                  {...register("user_name", { required: true })}
                  className="border-2 border-gray-600 p-2 rounded-[5px]" />
                {errors?.user_name && <p className="text-[12px] text-red-500">Username is Required to start the call</p>}

                <label
                  htmlFor="contuct number"
                  className="font-bold">Enter Your Role :-</label>
                <input
                  type="text"
                  placeholder="Doctor"
                  {...register("role", { required: true })}
                  className="border-2 border-gray-600 p-2 rounded-[5px]" />
                {errors?.role && <p className="text-[12px] text-red-500">Role is Required to start the call</p>}

                <label
                  htmlFor="contuct number"
                  className="font-bold">Enter Your Description :-</label>
                <input
                  type="text"
                  placeholder="I'm Medicine specialist Doctor"
                  {...register("description", { required: true })}
                  className="border-2 border-gray-600 p-2 rounded-[5px]" />
                {errors?.description && <p className="text-[12px] text-red-500">Description is Required to start the call</p>}
                <div className="mt-2 flex gap-x-2">
                  <button
                    disabled={isCallActive === true ? true : false}
                    type="submit"
                    className={`${isCallActive === false ? "bg-green-500" : "bg-gray-500"} py-1 w-full text-white rounded-[5px] font-bold`}>Start Call</button>
                  <button
                    disabled={isCallActive === true ? false : true}
                    onClick={() => retellWebClient.stopCall()}
                    className={`${isCallActive === true ? "bg-red-500" : "bg-gray-500"} py-1 w-full text-white rounded-[5px] font-bold`}>End Call</button>
                </div>
              </form>

            </div>
            : null
        }
      </div>
    </div>
  );
};

export default AgentCall;
