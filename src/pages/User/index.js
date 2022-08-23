import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import s from "./user.module.scss";
import { IoLocationSharp, IoEarth } from "react-icons/io5";
import {
  AiOutlineLink,
  AiFillCheckCircle,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
import { getUser } from "../../api";
import clsx from "clsx";
import Dropdown from "../../components/Dropdown";
import RenderIf from "../../utils/renderIf";
import { LinearProgress } from "../../components/Loading";

const User = () => {
  const { username } = useParams();
  const [user, setUser] = useState({});
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
    getUser(username)
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

  return (
    <LinearProgress loading={loading}>
      <div className={s.user_outer}>
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
                  <AiFillCheckCircle />
                  Available for hire
                </div>
              </RenderIf>
              <RenderIf isTrue={location}>
                <div className={s.user_item}>
                  <IoLocationSharp />
                  {location}
                </div>
              </RenderIf>
              <div className={s.user_item}>
                <RenderIf
                  isTrue={
                    social?.portfolio_url ||
                    social?.instagram_username ||
                    social?.twitter_username
                  }
                >
                  <AiOutlineLink />
                  <Dropdown title={`Connect with ${first_name}`}>
                    {contacts.map((el, i) => {
                      return (
                        <RenderIf isTrue={el.username} key={i}>
                          <a href={el.url} target="_blank" rel="noreferrer">
                            {el.icon}
                            {el.title}
                          </a>
                        </RenderIf>
                      );
                    })}
                  </Dropdown>
                </RenderIf>
              </div>
            </div>
            <RenderIf isTrue={tags?.custom?.length}>
              <div className={s.user_interest}>
                <div>Interest</div>
                <div className={s.user_tags}>
                  {tags?.custom?.map((el, i) => {
                    return (
                      <Link
                        to={`/photos/${el.title}`}
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
    </LinearProgress>
  );
};

export default User;
