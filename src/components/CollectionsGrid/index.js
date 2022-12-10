import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import s from "./collections.module.scss";

import Tabs from "../../UI/Tabs";
import RenderIf from "../../utils/RenderIf";
import { LinearProgress } from "../../UI/Loading";

const CollectionsGrid = ({ name, collections, loading }) => {
  return (
    <>
      <div className={s.tabs_wrapper}>
        <Tabs name={name} tab="collections" />
      </div>
      <LinearProgress loading={loading}>
        <div className={s.collections_outer}>
          <div className={s.collections_container}>
            <RenderIf isTrue={name}>
              <h1>{name ? name : "Loading"}</h1>
            </RenderIf>
            <div className={s.collections_inner}>
              {collections.map((el) => {
                return (
                  <div key={el.id}>
                    <Link
                      to={`/collections/${el.id}/${el.title}`}
                      className={s.collection_link}
                    >
                      <div className={s.collection}>
                        {el.preview_photos.map((img) => {
                          return (
                            <div key={img.id} className={s.image}>
                              <LazyLoadImage
                                src={img.urls.small}
                                alt={img.urls.id}
                                effect="blur"
                                placeholderSrc={img.urls.small}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </Link>
                    <div className={s.collection_title}>{el.title}</div>
                    <div className={s.collection_owner}>
                      {el.total_photos} photos · Curated by{" "}
                      <Link to={`/@${el.user.username}`}>{el.user.name}</Link>
                    </div>
                    <div className={s.collections_tags}>
                      {el.tags.slice(0, 3).map((tag, i) => {
                        return (
                          <Link key={i} to={`/photos/${tag.title}/relevant`}>
                            {tag.title}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </LinearProgress>
    </>
  );
};

export default CollectionsGrid;
