"use client"
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import { getCookie } from 'cookies-next';
import AgeDistribution from '../AgeDistribution/AgeDistribution';
import ProblemDistribution from '../ProblemDistribution/ProblemDistribution';

type PatientsDataType = [{
  doc_name: string,
  name: string,
  email: string,
  cont_number: number,
  dob: string,
  gender: string,
  age: number,
  des: string
}]

type AgeDistributionType = {
  [key: string]: number;
};

type ProblemDistributionType = {
  [key: string]: number;
};

async function FetchPatients(doc_name: string, setPetients: React.Dispatch<any>, setAgeData: React.Dispatch<any>, setProblemData: React.Dispatch<any>) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_KEY}/patient`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ doc_name: doc_name }),
    });


    if (res.ok) {
      const rawResponse = await res.text();
      const datas = JSON.parse(rawResponse);
      setPetients(datas);
      AgeDistributionControl(datas, setAgeData);
      ProblemDistributionControl(datas, setProblemData);
    } else {
      console.log("No patient found");
    }

  } catch (errors) {
    console.log("No Patient Found Due To :-", errors)
  }
}

//Problem
function ProblemDistributionControl(datas: PatientsDataType, setProblemData: React.Dispatch<any>) {
  const problemData: AgeDistributionType = {};
  for (let i = 0; i < datas.length; i++) {
    if (!problemData[datas[i].des.toLocaleLowerCase()]) {
      problemData[datas[i].des.toLocaleLowerCase()] = 0;
    }
    problemData[datas[i].des.toLocaleLowerCase()] += 1;
  }
  console.log(problemData);
  setProblemData(problemData);
}
//Age
function AgeDistributionControl(datas: PatientsDataType, setAgeData: React.Dispatch<any>) {
  const ageData: AgeDistributionType = {};
  for (let i = 0; i < datas.length; i++) {
    if (!ageData[datas[i].age]) {
      ageData[datas[i].age] = 0;
    }
    ageData[datas[i].age] += 1;
  }
  setAgeData(ageData);
}
function Dashboard() {
  const { present, setPresent }: any = useContext(GlobalContext);
  const [patients, setPetients] = useState<PatientsDataType | any>([]);
  const [ageData, setAgeData] = useState<AgeDistributionType | any>({});
  const [problemData, setProblemData] = useState<ProblemDistributionType | any>({});
  useEffect(() => {
    const cookies = getCookie("user");
    if (cookies !== undefined || present === true) {
      if (typeof cookies === "string") {
        const NewCookies = JSON.parse(cookies);
        FetchPatients(NewCookies?.name, setPetients, setAgeData, setProblemData);
      } else {
        console.log("Failed to parse the cookies");
      }
    }
  }, [present]);
  return (
    <div className='w-full'>
      {patients.length === 0 ?
        <div>
          <p>No Patients Available</p>
        </div> :
        <div>
          <p className='text-[25px] font-bold text-center mb-24'>Number of Patients :- {patients?.length}</p>
          <div className='grid sm:flex'>
            <div className='w-full h-[400px] '>
              <AgeDistribution ageData={ageData} />
            </div>
            <div className='w-full h-[400px] '>
              <ProblemDistribution problemData={problemData} />
            </div>
          </div>
        </div>}
    </div>
  )
}

export default Dashboard