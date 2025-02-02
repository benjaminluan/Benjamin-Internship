import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";
const Author = () => {
  const { id } = useParams();
  const [isData, setIsData] = useState("");
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);
  async function fetchData() {
    const { data } = await axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
      )
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
    setIsData(data);
    setLoading(false);
  }
  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>
        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {isData ? (
                        <img src={isData?.authorImage} alt="" />
                      ) : (
                        <Skeleton
                          width="150px"
                          height="150px"
                          borderRadius="50%"
                        />
                      )}

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        {loading === false ? (
                          <h4>
                            {isData.authorName}
                            <span className="profile_username">
                              @{isData.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {isData.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        ) : (
                          <h4>
                            <Skeleton width="200px" />
                            <span className="profile_username">
                              <Skeleton width="100px" />
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton width="100px" />
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {loading === false ? (
                        <div className="profile_follower">
                          {isData.followers + (following === true ? 1 : 0)}{" "}
                          followers
                        </div>
                      ) : (
                        <div className="profile_follower">
                          <Skeleton width="100px" height="25px" />
                        </div>
                      )}

                      {following === false ? (
                        <Link
                          to="#"
                          className="btn-main"
                          onClick={() => setFollowing(true)}
                        >
                          Follow
                        </Link>
                      ) : (
                        <Link
                          to="#"
                          className="btn-main"
                          onClick={() => setFollowing(false)}
                        >
                          Unfollow
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorData={isData} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
