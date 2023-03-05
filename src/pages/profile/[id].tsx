import React, { useState, useEffect } from "react";
import { useProfileQuery, usePublicationsQuery } from "../../../graphql/generated";
import styles from "../../styles/Profile.module.css";
import { useRouter } from "next/router";
import Feed from "../../../components/Feed";
import axios from 'axios';
import Link from "next/link"


type Props = {};

// Grab window.localStorage.LH_STORAGE_KEY
const STORAGE_KEY = "LH_STORAGE_KEY"
let accessToken = ""

export default function ProfilePage({}: Props) {
  const router = useRouter();
  // Grab the path / [id] field from the URL - whatever this file is named
  const { id } = router.query;

  type hits = {
    objectID: string;
    url: string;
    title: string;
  };

  type ouraUser = {
    age: number;
    weight: number;
    height: number
    gender: string;
    email: string;
    user_id: string;
  }

  type sleepData = {
    deep_sleep: number,
    efficiency: number,
    latency: number,
    rem_sleep: number,
    restfulness: number,
    timing: number,
    total_sleep: number
  }

  // const [data, setData] = useState<hits[]>([])
  const [ouraUserInfo, setouraUserInfo] = useState<ouraUser>()
  const [ouraSleepData, setouraSleepData] = useState<sleepData>()

  // useEffect(() => {
  //   const fetch = async () => {
  //      const result = await axios(
  //     'https://hn.algolia.com/api/v1/search?query=redux',
  //   )
  //   setData(result.data.hits)
  //   console.log(result.data.hits)
  //   }
  //   fetch() 
  // }, []);

  if (typeof window !== "undefined" && window.location.hash) {
    accessToken = window.location.hash.substring(14, 46);
    console.log(`Access token set to: ${accessToken}`);
  }

  useEffect(() => {
    if (accessToken) {
      console.log(`running the get with the access token ${accessToken}`)
      const currentDate = new Date()
      let date = currentDate.toISOString().slice(0, 10)
    const fetch = async () => {
      // This is a temporary proxy fix, will need to fix CORs in production
       const result = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.ouraring.com/v2/usercollection/daily_sleep?start_date=${date}&end_date=${date}`,
       {headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*'
      }}
    )
    // @ts-ignore
    console.log(result.data.data[0].contributors)
    setouraSleepData(result.data.data[0].contributors)
  }
    fetch() 
  }
  }, []);

  const { isLoading: loadingProfile, data: profileData, error: profileError } = useProfileQuery(
    {
      request: {
        handle: id,
      },
    },
    // Don't fire this query until id is available
    {
      enabled: !!id,
    }
  );

  const { isLoading: isLoadingPublications, data: publicationsData, error: publicationsError } = usePublicationsQuery(
    {
      request: {
        profileId: profileData?.profile?.id,
      },
    },
    {
    // make sure profile id is available before getting posts
      enabled: !!profileData?.profile?.id,
    }
  );

  if (publicationsError || profileError) {
    return <div>Could not find this profile.</div>;
  }

  if (loadingProfile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <h2>Oura Stats</h2>
      <div>Deep Sleep: {ouraSleepData?.deep_sleep}</div>
      <div>Efficieny: {ouraSleepData?.efficiency}</div>
      <div>Latency: {ouraSleepData?.latency}</div>
      <div>REM Sleep: {ouraSleepData?.rem_sleep}</div>
      <div>Restfulness: {ouraSleepData?.restfulness}</div>
      <div>Timing: {ouraSleepData?.timing}</div>
      <div>Total Sleep: {ouraSleepData?.total_sleep}</div>
        <Link href="https://cloud.ouraring.com/oauth/authorize?response_type=token&client_id=M64QGUBX7D74Z5HD&redirect_uri=http://localhost:3000/profile/fsdgdvxchdsfg.test">
              <div className="mr-4 p-6">Connect Oura</div>
        </Link>
        <div>
        <ul>
            {/* {data.map((item : hits) => (
              <li key={item.objectID}>
                  <a href={item.url}>{item.title}</a>
              </li>
            ))} */}
        </ul>
        </div>
      <div className={styles.profileContentContainer}>
        {/* Cover Image */}
        {/* @ts-ignore */}
        {profileData?.profile?.coverPicture?.original?.url && (<div></div>
        //   <MediaRenderer
        //     // @ts-ignore
        //     src={profileData?.profile?.coverPicture?.original?.url || ""}
        //     alt={
        //       profileData?.profile?.name || profileData?.profile?.handle || ""
        //     }
        //     className={styles.coverImageContainer}
        //   />
        )}
        {/* Profile Picture */}
        {/* @ts-ignore */}
        {profileData?.profile?.picture?.original?.url && (<div></div>
        //   <MediaRenderer
        //     // @ts-ignore
        //     src={profileData.profile.picture.original.url}
        //     alt={profileData.profile.name || profileData.profile.handle || ""}
        //     className={styles.profilePictureContainer}
        //   />
        )}

        {/* Profile Name */}
        <h1 className={styles.profileName}>
          {profileData?.profile?.name || "Anon User"}
        </h1>
        {/* Profile Handle */}
        <p className={styles.profileHandle}>
          @{profileData?.profile?.handle || "anonuser"}
        </p>

        {/* Profile Description */}
        <p className={styles.profileDescription}>{profileData?.profile?.bio}</p>

        <p className={styles.followerCount}>
          {profileData?.profile?.stats.totalFollowers} {" Followers"}
        </p>

        {/* <Web3Button
          contractAddress={LENS_CONTRACT_ADDRESS}
          contractAbi={LENS_CONTRACT_ABI}
          action={async () => await followUser(profileData?.profile?.id)}
        >
          Follow User
        </Web3Button> */}

        <div className={styles.publicationsContainer}>
          {isLoadingPublications ? (
            <div>Loading Publications...</div>
          ) : (
            // Iterate over the items in the publications array
            publicationsData?.publications.items.map((publication) => (
              <Feed publication={publication} key={publication.id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}