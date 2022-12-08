import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import s from "./singleTopic.module.scss";

import { getTopic, getTopicPhotos } from "../../api";
import ImagesGrid from "../../components/ImagesGrid";
import { LinearProgress } from "../../UI/Loading";
import RenderIf from "../../utils/RenderIf";
import PageTitle from "../../utils/PageTitle";

const SingleTopic = () => {
  const { slug } = useParams();
  const [topic, setTopic] = useState({});
  const [topicPhotos, setTopicPhotos] = useState([]);
  const [topicLoading, setTopicLoading] = useState(true);
  const [photosLoading, setPhotosLoading] = useState(true);

  useEffect(() => {
    setTopicLoading(true);
    getTopic(slug)
      .then((res) => {
        setTopic(res);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTopicLoading(false);
      });
  }, [slug]);

  useEffect(() => {
    setPhotosLoading(true);
    getTopicPhotos(slug)
      .then((res) => {
        setTopicPhotos(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setPhotosLoading(false);
      });
  }, [slug]);

  return (
    <PageTitle title={topic.title}>
      <div className={s.topic_outer}>
        <div className={s.background_image}>
          <RenderIf isTrue={!topicLoading}>
            <LazyLoadImage
              src={topic.cover_photo?.urls.full}
              alt={topic?.title}
              effect="blur"
              placeholderSrc={topic.cover_photo?.urls.small}
            />
          </RenderIf>
          <div className={s.background_layout} />
        </div>
        <div className={s.topic_inner}>
          <div className={s.topic_content}>
            <h1>{topic.title}</h1>
            <p>{topic.description}</p>
          </div>
        </div>
        <div className={s.user}>
          <p>Photo by</p>
          <Link to={`/@${topic.cover_photo?.user.username}`}>
            {topic.cover_photo?.user.name}
          </Link>
        </div>
      </div>

      <LinearProgress loading={photosLoading}>
        <ImagesGrid images={topicPhotos} />
      </LinearProgress>
    </PageTitle>
  );
};

export default SingleTopic;
