import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiMovie2Line, RiMovieLine } from "react-icons/ri";

export default function Page({ items = {} }) {
  let [status, setStatus] = useState(0);
  return (
    <div className="card" data-aos="fade-up">
      <div className="card-header">Listeler</div>
      <Link
        className="card-body text-primary py-3 mb-2 d-flex justify-content-between"
        onClick={() => setStatus(1)}
      >
        <span>
          <RiMovie2Line size={32} className="me-3" />
          Izledigim Filmler
        </span>
        <span>
          <div className="badge bg-muted">{items?.watched_movies?.length}</div>
        </span>
      </Link>

      {status == 1 ? (
        <div className="w-100 mt-2">
          {items?.watched_movies?.map((item) => (
            <Link
              className="w-100 d-block p-3"
              to={"/main/movie/" + item.source_id}
            >
              {item.title}
            </Link>
          ))}
        </div>
      ) : null}

      <Link
        className="card-body text-primary py-3 mb-2 d-flex justify-content-between"
        onClick={() => setStatus(2)}
      >
        <span>
          <RiMovieLine size={32} className="me-3" />
          Izledigim Diziler
        </span>
        <span>
          <div className="badge bg-muted">{items?.watched_series?.length}</div>
        </span>
      </Link>

      {status == 2 ? (
        <div className="w-100 mt-2">
          {items?.watched_series?.map((item) => (
            <Link
              className="w-100 d-block p-3"
              to={"/main/series/" + item.source_id}
            >
              {item.title}
            </Link>
          ))}
        </div>
      ) : null}

      <Link
        className="card-body text-warning py-3 mb-2 d-flex justify-content-between"
        onClick={() => setStatus(3)}
      >
        <span>
          <RiMovie2Line size={32} className="me-3" />
          Izliyecegim Filmler
        </span>
        <span>
          <div className="badge bg-muted">{items?.watch_movies?.length}</div>
        </span>
      </Link>

      {status == 3 ? (
        <div className="w-100 mt-2">
          {items?.watch_movies?.map((item) => (
            <Link
              className="w-100 d-block p-3"
              to={"/main/movie/" + item.source_id}
            >
              {item.title}
            </Link>
          ))}
        </div>
      ) : null}

      <Link
        className="card-body text-warning py-3 mb-2 d-flex justify-content-between"
        onClick={() => setStatus(4)}
      >
        <span>
          <RiMovieLine size={32} className="me-3" />
          Izliyecegim Diziler
        </span>
        <span>
          <div className="badge bg-muted">{items?.watch_series?.length}</div>
        </span>
      </Link>

      {status == 4 ? (
        <div className="w-100 mt-2">
          {items?.watch_series?.map((item) => (
            <Link
              className="w-100 d-block p-3"
              to={"/main/series/" + item.source_id}
            >
              {item.title}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
