import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "./category.scss";
import ChallengeCard from "../../components/ChallengeCard/ChallengeCard";
import { FirebaseContext } from "./../../context/FirebaseContext";
import { useContext, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { motion } from "framer-motion";
function Category() {
  const { challengeCollection } = useContext(FirebaseContext);
  const [challenges] = useCollectionData(challengeCollection);

  const [title, setTitle] = useState("Choose a category to display");
  const [renderArr, setRenderArr] = useState([]);

  const handleClick = (e) => {
    if (e.target.name === "all") {
      setRenderArr(challenges);
      return;
    }
    const filteredCat = challenges.filter(
      (challenge) => challenge.category.value === e.target.name
    );
    setRenderArr(filteredCat);
  };

  return (
    <div className="section-padding categroy bg-body text-white">
      <div className="container">
        <div
          className="wv-100 p-4 rounded-4 mb-2"
          style={
            title === "Frontend"
              ? { "background-color": "#3a3a3a" }
              : title === "Backend"
              ? { "background-color": "#414040" }
              : title === "UI/UX"
              ? { "background-color": "#494848 " }
              : { "background-color": "#2f2f2f" }
          }
        >
          <h1 className="text-center  bg mb-5">{title}</h1>
          <div className="row categroy mb-5 ">
            <div aria-label="button-group Basic example row  col-12 ">
              <div className="col-5 my-1 mx-0 col-md-3 bg-primary rounded-2 text-center  mx-2">
                <button
                  className="rounded-1  btn w-100 py-3 "
                  name="all"
                  // variant="secondary me-2 bg-color border-0"
                  onClick={(e) => {
                    handleClick(e);
                    setTitle("All");
                  }}
                >
                  All
                </button>
              </div>
              <div className="col-6 col-md-3 bg-primary rounded-2 text-center  mx-2">
                <Button
                  name="frontend"
                  className="rounded-1  btn w-100 py-3 "
                  onClick={(e) => {
                    handleClick(e);
                    setTitle("Frontend");
                  }}
                >
                  Frontend
                </Button>
              </div>
              <div className="col-6 col-md-3 bg-primary rounded-2 text-center  mx-2">
                <Button
                  name="backend"
                  className="rounded-1  btn w-100 py-3 "
                  onClick={(e) => {
                    handleClick(e);
                    setTitle("Backend");
                  }}
                >
                  Backend
                </Button>
              </div>
              <div className="col-6 col-md-3 bg-primary rounded-2 text-center  mx-2">
                <Button
                  name="ui/ux"
                  className="rounded-1  btn w-100 py-3 "
                  onClick={(e) => {
                    handleClick(e);
                    setTitle("UI/UX");
                  }}
                >
                  UI/UX
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="row ay-7aga align-items-lg-stretch">
            {renderArr.map((ch, i) => {
              return (
                <motion.div>
                  <div className="col-md-6 col-sm-12 col-lg-4">
                    <ChallengeCard post={ch} key={ch.cid} className="h-100" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
