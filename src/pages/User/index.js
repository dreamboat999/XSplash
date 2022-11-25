import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import clsx from "clsx";

import s from "./user.module.scss";
import { MdPhoto } from "react-icons/md";
import { IoEarth, IoLocationSharp } from "react-icons/io5";
import {
  AiFillCheckCircle,
  AiOutlineInstagram,
  AiOutlineLink,
  AiOutlineTwitter,
} from "react-icons/ai";

import { getUserImages, getUserInfo } from "../../api";
import Dropdown from "../../UI/Dropdown";
import { LinearProgress } from "../../UI/Loading";
import ImagesGrid from "../../components/ImagesGrid";
import RenderIf from "../../utils/RenderIf";
import PageTitle from "../../utils/PageTitle";

const User = () => {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [images, setImages] = useState([]);

  const {
    profile_image,
    first_name,
    last_name,
    location,
    tags,
    for_hire,
    social,
    bio,
  } = user;
  const [loading, setLoading] = useState(true);

  const contacts = [
    {
      title: "Website",
      username: social?.portfolio_url,
      url: social?.portfolio_url,
      icon: <IoEarth />,
    },
    {
      title: "Instagram",
      username: social?.instagram_username,
      url: `https://instagram.com/${social?.instagram_username}`,
      icon: <AiOutlineInstagram />,
    },
    {
      title: "Twitter",
      username: social?.twitter_username,
      url: `https://twitter.com/${social?.twitter_username}`,
      icon: <AiOutlineTwitter />,
    },
  ];

  useEffect(() => {
    setLoading(true);
    getUserInfo(username)
      .then((resp) => {
        setUser(resp);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [username]);

  const handleClick = (url) => {
    if (url) {
      window.open(url);
    }
  };

  useEffect(() => {
    getUserImages(username)
      .then((response) => {
        setImages(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [username]);

  return (
    <PageTitle title={username ? `@${username}` : "Loading"}>
      <LinearProgress loading={loading}>
        <div className={s.user_outer}>
          <div className="container">
            <div className={s.user_inner}>
              <div className={s.user_image_outer}>
                <div className={s.user_image_inner}>
                  <img src={profile_image?.large} alt={first_name} />
                </div>
              </div>
              <div className={s.user_info}>
                <div className={s.user_name}>
                  {first_name}&nbsp;{last_name}
                </div>
                <div className={s.user_bio}>
                  {bio
                    ? bio
                    : `Download free, beautiful high-quality photos curated by ${first_name}.`}
                </div>
                <div className={s.user_items}>
                  <RenderIf isTrue={for_hire}>
                    <div className={clsx(s.user_item, s.available)}>
                      <div className={s.icon}>
                        <AiFillCheckCircle />
                      </div>
                      Available for hire
                    </div>
                  </RenderIf>
                  <RenderIf isTrue={location}>
                    <div className={s.user_item}>
                      <div className={s.icon}>
                        <IoLocationSharp />
                      </div>
                      {location}
                    </div>
                  </RenderIf>
                  <RenderIf
                    isTrue={
                      social?.portfolio_url ||
                      social?.instagram_username ||
                      social?.twitter_username
                    }
                  >
                    <div className={s.user_item}>
                      <div className={s.icon}>
                        <AiOutlineLink />
                      </div>
                      <Dropdown title={`Connect with ${first_name}`}>
                        {contacts.map((el, i) => {
                          return (
                            <button
                              key={i}
                              onClick={() => handleClick(el.url)}
                              disabled={!el.username}
                            >
                              {el.icon}
                              {el.title}
                            </button>
                          );
                        })}
                      </Dropdown>
                    </div>
                  </RenderIf>
                </div>
                <RenderIf isTrue={tags?.custom?.length}>
                  <div className={s.user_interest}>
                    <div>Interest</div>
                    <div className={s.user_tags}>
                      {tags?.custom?.map((el, i) => {
                        return (
                          <Link
                            to={`/photos/${el.title}/relevant`}
                            key={i}
                            className={s.user_tag}
                          >
                            {el.title}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </RenderIf>
              </div>
            </div>
          </div>
        </div>
      </LinearProgress>

      <div className="photos_outer">
        <div className="photos_inner">
          <div className="photos">
            <MdPhoto />
            <div>Photos</div>
          </div>
        </div>
      </div>

      <ImagesGrid images={images} />
    </PageTitle>
  );
};

export default User;
