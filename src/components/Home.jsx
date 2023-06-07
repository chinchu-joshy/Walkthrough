import React from "react";
import { Link } from "react-router-dom";
import Three from "../threeD/Three";

function Home() {
  return (
    <>
      <div className="main">
        <Three path={{ modelPath: "street_exterior_dead_end" }} />
        <div className="content">
          <h1>Welcome to the word of Dawgz </h1>
          <p>
            Yo, what's poppin' Dawgz? Welcome to our dope den, where the fusion
            of creativity,community, and innovation comes alive. We're stoked to
            have you here, ready to embark on an unforgrttable journey with the
            Dwagz crew.
          </p>
          <Link className="link" to="/three">
            <h3 className="button-to-enter">Enter the Den</h3>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
