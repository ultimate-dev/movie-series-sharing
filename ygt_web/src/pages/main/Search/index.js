import { message } from "antd";
import React, { useEffect, useState } from "react";
import * as configs from "../../../configs";
import { get } from "../../../helpers/http.helper";
import { useQuery } from "../../../hooks/use-query";
import { hideLoading, showLoading } from "../../../redux/actions";
import Tilt from "react-parallax-tilt";
import { Link } from "react-router-dom";
import Avatar from "antd/lib/avatar/avatar";
import axios from "axios";

export default function Page() {
  let [users, setUsers] = useState([]);
  let [movies, setMovies] = useState([]);
  let [series, setSeries] = useState([]);

  let query = useQuery();
  let search = query.get("search") ? query.get("search") : "";

  async function getUsers() {
    showLoading();
    await get("api/user/search", { search }).then((res) => {
      if (res.result) {
        setUsers(res.users);
      } else {
        message.error(res.message);
      }
      hideLoading();
    });
  }

  async function getMovies() {
    showLoading();
    await axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${configs.tmdb_key}&language=tr-TR&page=1&query=${search}`
      )
      .then((res) => {
        setMovies(res.data.results);
      });
    hideLoading();
  }

  async function getSeries() {
    showLoading();
    await axios
      .get(
        `https://api.themoviedb.org/3/search/tv?api_key=${configs.tmdb_key}&language=tr-TR&page=1&query=${search}`
      )
      .then((res) => {
        setSeries(res.data.results);
      });
    hideLoading();
  }

  useEffect(() => {
    getUsers();
    getMovies();
    getSeries();
  }, [search]);

  return (
    <div className="w-100">
      {users.length > 0 ? (
        <div className="card mt-5" data-aos="fade-up">
       
          <div className="card-header">
            KULLANICILAR
            <div className="badge bg-primary ms-2 fw-500">{users.length}</div>
          </div>

          <div className="row">
            {users.map((item, key) => (
              <Tilt className="col-md-4 col-6 my-2" key={key}>
                <Link
                  className="card-body d-block p-0"
                  to={"/main/u/" + item?.user_id}
                  data-aos="fade-up"
                >
                  <img
                    src={item?.back}
                    className="rounded"
                    width="100%"
                    height="80px"
                    style={{ objectFit: "cover" }}
                  />
                  <div
                    className="d-flex justify-content-center"
                    style={{
                      marginTop: "-25px",
                    }}
                  >
                    <Avatar
                      className="avatar shadow"
                      size={45}
                      style={{
                        minWidth: 45,
                        minHeight: 45,
                        border: "2px solid #fff",
                      }}
                      src={item?.image}
                      draggable={false}
                    >
                      {String(
                        String(item?.name).substring(0, 1) +
                          String(item?.surname).substring(0, 1)
                      ).toUpperCase()}
                    </Avatar>
                  </div>
                  <div className="pb-3 mt-2 px-3">
                    <div className="text-dark">
                      {item?.name + " " + item?.surname}
                    </div>
                    <div className="text-muted fw-300">@{item?.user_name}</div>
                  </div>
                </Link>
              </Tilt>
            ))}
          </div>
        </div>
      ) : null}
      {movies.length > 0 ? (
        <div className="card mt-5" data-aos="fade-up">
          <div className="card-header">
            Filimler
            <div className="badge bg-primary ms-2 fw-500">{movies.length}</div>
          </div>

          <div className="row">
            {movies.map((item, key) => (
              <Tilt className="col-md-4 col-6 my-2" key={key}>
                <Link
                  className="card-body d-block p-3"
                  to={"/main/movie/" + item.id}
                  data-aos="fade-up"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                    className="rounded shadow"
                    width="100%"
                    height="200px"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="mt-2">
                    <div className="text-dark fw-500">{item.title}</div>
                    <div className="text-muted">
                      {Number(item.vote_average).toFixed(1)} / 10
                    </div>
                  </div>
                </Link>
              </Tilt>
            ))}
          </div>
        </div>
      ) : null}

      {series.length > 0 ? (
        <div className="card mt-5" data-aos="fade-up">
          <div className="card-header">
            Diziler
            <div className="badge bg-primary ms-2 fw-500">{series.length}</div>
          </div>

          <div className="row">
            {series.map((item, key) => (
              <Tilt className="col-md-4 col-6 my-2" key={key}>
                <Link
                  className="card-body d-block p-3"
                  to={"/main/series/" + item.id}
                  data-aos="fade-up"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                    className="rounded shadow"
                    width="100%"
                    height="200px"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="mt-2">
                    <div className="text-dark fw-500">{item.name}</div>
                    <div className="text-muted">
                      {Number(item.vote_average).toFixed(1)}/10
                    </div>
                  </div>
                </Link>
              </Tilt>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
