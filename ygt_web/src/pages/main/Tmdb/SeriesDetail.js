import axios from "axios";
import * as configs from "../../../configs";
import React, { useEffect, useState } from "react";
import { hideLoading, showLoading } from "../../../redux/actions";
import { useHistory, useParams } from "react-router";
import { Button, message } from "antd";
import moment from "moment";
import { get, post } from "../../../helpers/http.helper";
import { MdChevronLeft } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Page() {
  let [series, setSeries] = useState({});
  let [watch, setWatch] = useState(0);

  let { series_id } = useParams();
  let history = useHistory();
  
  async function getSeries() {
    showLoading();
    await axios
      .get(
        `https://api.themoviedb.org/3/tv/${series_id}?api_key=${configs.tmdb_key}&language=tr-TR`
      )
      .then((res) => {
        console.log(res);
        setSeries(res.data);
      });
    hideLoading();
  }

  async function getWatch() {
    showLoading();
    await get("api/account/watch_status", {
      source_id: series_id,
      type: "series",
    }).then((res) => {
      if (res.result) {
        setWatch(res.watch);
      } else {
        message.error(res.message);
      }
    });
    hideLoading();
  }

  async function onWatch(watch, run) {
    showLoading();
    await post("api/account/watch_status", {
      source_id: series_id,
      type: "series",
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
    getSeries();
    getWatch();
  }, [series_id]);

  return (
    <div className="w-100">
      <div className="card" data-aos="fade-up">
        <div className="card-body">
        <div className="d-flex align-items-center mb-4">
            <Link className="pe-2 me-2" onClick={() => history.goBack()}>
              <MdChevronLeft size={32} className=" text-muted" />
            </Link>
          </div>
          <div className="row">
            <div className="col-md-4">
              <img
                src={`https://image.tmdb.org/t/p/original/${series.poster_path}`}
                className="rounded shadow"
                width="100%"
                height="300px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="col-md-8 py-4">
              <h5>{series.name}</h5>
              <div className="text-muted">
                {series.vote_average}/10 ({series.vote_count})
              </div>
              <div className="w-100 mt-3">
                - {series?.last_episode_to_air?.episode_number} Sezon
              </div>
              <div className="w-100">
                - Yayin tarihi{" "}
                {moment(series?.last_episode_to_air?.air_date).format(
                  "DD.MM.yyyy"
                )}
              </div>
              <div className="btn-group w-100 mt-5">
                {watch == 2 ? (
                  <Button
                    className="btn btn-soft-primary w-100"
                    onClick={() => onWatch(0, getWatch)}
                  >
                    Izledim
                  </Button>
                ) : (
                  <Button
                    className="btn btn-soft-muted w-100"
                    onClick={() => onWatch(2, getWatch)}
                  >
                    Izledim
                  </Button>
                )}

                {watch == 1 ? (
                  <Button
                    className="btn btn-soft-primary w-100"
                    onClick={() => onWatch(0, getWatch)}
                  >
                    Izliyecegim
                  </Button>
                ) : (
                  <Button
                    className="btn btn-soft-muted w-100"
                    onClick={() => onWatch(1, getWatch)}
                  >
                    Izliyecegim
                  </Button>
                )}
              </div>
            </div>

            <div className="col-md-12">
              <div className="text-muted mt-4">{series.overview}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
