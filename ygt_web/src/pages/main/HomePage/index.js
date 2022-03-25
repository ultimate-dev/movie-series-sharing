import { Button, message } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import * as configs from "../../../configs";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get, post } from "../../../helpers/http.helper";
import { hideLoading, showLoading } from "../../../redux/actions";
import axios from "axios";
import moment from "moment";

export default function Page() {
  let [posts, setPosts] = useState([]);
  let [postValues, setPostValues] = useState({});
  async function getPosts() {
    showLoading();
    await get("api/posts").then((res) => {
      if (res.result) {
        setPosts(res.posts);
      } else {
        message.error(res.message);
      }
    });
    hideLoading();
  }

  async function sendPost() {
    showLoading();
    await post("api/posts", { ...postValues }).then((res) => {
      if (res.result) {
        setPostValues({});
        getPosts();
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
    hideLoading();
  }

  useEffect(() => getPosts(), []);

  return (
    <div className="w-100">
      <div className="card" data-aos="fade-up">
        <div className="card-body mb-3">
          <label className="form-label">Yeni Gonderi</label>
          <textarea
            className="form-control"
            onChange={(e) =>
              setPostValues({ ...postValues, text: e.target.value })
            }
          >
            {setPostValues.text}
          </textarea>
          <Button onClick={sendPost} className="btn btn-primary mt-3">
            Gonder
          </Button>
        </div>
        {posts.map((p) => (
          <Box {...p} getPosts={getPosts} />
        ))}
      </div>
    </div>
  );
}

function Box({ watch, item, getPosts }) {
  let [movie, setMovie] = useState({});
  let [series, setSeries] = useState({});

  async function getMovie() {
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${item.source_id}?api_key=${configs.tmdb_key}&language=tr-TR`
      )
      .then((res) => {
        setMovie(res.data);
      });
  }

  async function getSeries() {
    await axios
      .get(
        `https://api.themoviedb.org/3/tv/${item.source_id}?api_key=${configs.tmdb_key}&language=tr-TR`
      )
      .then((res) => {
        setSeries(res.data);
      });
  }

  async function onWatch(watch, type, run) {
    showLoading();
    await post("api/account/watch_status", {
      source_id: item.source_id,
      type,
      watch,
      title: series.name,
    }).then((res) => {
      if (res.result) {
        message.success(res.message);
        run();
      } else {
        message.error(res.message);
      }
    });
    hideLoading();
  }

  useEffect(() => {
    if (item.type == "series") getSeries();
    if (item.type == "movie") getMovie();
  }, []);

  return (
    <div className="card-body my-3">
      <div className="d-flex mb-3">
        <Link
          className="d-flex align-items-center"
          to={"/main/u/" + item?.user?.user_id}
        >
          <Avatar
            className="avatar"
            size={40}
            style={{ minWidth: 40, minHeight: 40 }}
            src={item?.user?.image}
            draggable={false}
          >
            {String(
              String(item?.user?.name).substring(0, 1) +
                String(item?.user?.surname).substring(0, 1)
            ).toUpperCase()}
          </Avatar>
          <div className="ms-3 text-start me-3">
            <div className="fw-500 text-dark">
              {item?.user?.name + " " + item?.user?.surname}
            </div>
            <div className="fw-300 text-muted">@{item?.user?.user_name}</div>
          </div>
        </Link>
      </div>
      {item.type == "series" || item.type == "movie" ? (
        <div className="w-100 mb-3 d-flex">
          <div
            className="rounded p-4"
            style={{ backgroundColor: "rgba(0,0,0,.2)" }}
          >
            {item.type == "movie" ? (
              <Movie
                movie={movie}
                watch={watch}
                onWatch={(s) => onWatch(s, "movie", () => getPosts())}
              />
            ) : (
              <Series
                series={series}
                watch={watch}
                onWatch={(s) => onWatch(s, "series", () => getPosts())}
              />
            )}
          </div>
        </div>
      ) : null}

      <div className="text-muted">{item.text}</div>
    </div>
  );
}

function Movie({ movie, watch, onWatch }) {
  return (
    <>
      <div className="d-flex">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            className="rounded shadow"
            width="150px"
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="ps-3">
          <h5>{movie.title}</h5>
          <div className="text-muted">
            {movie.vote_average}/10 ({movie.vote_count})
          </div>
          <div className="w-100 mt-2">
            - Yayin tarihi {moment(movie?.release_date).format("DD.MM.yyyy")}
          </div>
          <div className="w-100 mt-3">
            <a
              href={`https://www.imdb.com/title/${movie.imdb_id}`}
              target="blank"
            >
              <img
                width="80px"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/1200px-IMDB_Logo_2016.svg.png"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="btn-group w-100 mt-3">
        {watch == 2 ? (
          <Button
            className="btn btn-soft-primary w-100"
            onClick={() => onWatch(0)}
          >
            Izledim
          </Button>
        ) : (
          <Button
            className="btn btn-soft-muted w-100"
            onClick={() => onWatch(2)}
          >
            Izledim
          </Button>
        )}

        {watch == 1 ? (
          <Button
            className="btn btn-soft-primary w-100"
            onClick={() => onWatch(0)}
          >
            Izliyecegim
          </Button>
        ) : (
          <Button
            className="btn btn-soft-muted w-100"
            onClick={() => onWatch(1)}
          >
            Izliyecegim
          </Button>
        )}
      </div>
    </>
  );
}

function Series({ series, watch, onWatch }) {
  return (
    <>
      <div className="d-flex">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/original/${series.poster_path}`}
            className="rounded shadow"
            width="150px"
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="ps-3">
          <h5>{series.name}</h5>
          <div className="text-muted">
            {series.vote_average}/10 ({series.vote_count})
          </div>
          <div className="w-100 mt-3">
            - {series?.last_episode_to_air?.episode_number} Sezon
          </div>
          <div className="w-100">
            - Yayin tarihi{" "}
            {moment(series?.last_episode_to_air?.air_date).format("DD.MM.yyyy")}
          </div>
        </div>
      </div>
      <div className="btn-group w-100 mt-3">
        {watch == 2 ? (
          <Button
            className="btn btn-soft-primary w-100"
            onClick={() => onWatch(0)}
          >
            Izledim
          </Button>
        ) : (
          <Button
            className="btn btn-soft-muted w-100"
            onClick={() => onWatch(2)}
          >
            Izledim
          </Button>
        )}

        {watch == 1 ? (
          <Button
            className="btn btn-soft-primary w-100"
            onClick={() => onWatch(0)}
          >
            Izliyecegim
          </Button>
        ) : (
          <Button
            className="btn btn-soft-muted w-100"
            onClick={() => onWatch(1)}
          >
            Izliyecegim
          </Button>
        )}
      </div>
    </>
  );
}
