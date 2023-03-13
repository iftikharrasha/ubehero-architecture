import React from "react";
import { 
  HiPlusCircle, 
  HiMinusCircle,
  HiCheckCircle 
} from 'react-icons/hi';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToWishList, removeFromWishList } from "../../redux/slices/tournamentSlice";
import styles from './tournament.module.css';

const Tournaments = ({remark, route, handleCancel, tournament, detailsPage, handleCheckout}) => {
  const { _id, tournamentName, gameType, tournamentThumbnail, version, purchased } = tournament;
  const { wishList } = useSelector((state) => state.tournaments);
  const isLoggedIn = useSelector(state => state.profile.signed_in);
  const isWishListed = wishList.find((t) => t._id === tournament._id);

  const dispatch = useDispatch();
  
  return (
    <div className='card d-flex mb-3 p-3' 
      style={{position: 'relative'}}
    >
      <div className='row'>
        <div className='col-md-3'>
          <img className="img-fluid" src={tournamentThumbnail} alt='' />
        </div>
        <div className='col-md-9'>
          <div className='card-body'>
            <h5 className='card-title'>{tournamentName}</h5>
            {/* <h6>{gameType}</h6> */}
            <p className='card-text'>version: {version}</p>
            {
              remark ? null :
              !isLoggedIn ? <Link to={`/tournament/details/${_id}`}><button>Join Now</button></Link> :
                            purchased ? <Link to={`/tournament/details/${_id}`}><button>Purchased</button></Link> :
                                  detailsPage ? 
                                       route === 'checkout' ? <button to={`/`} className="btn btn-success" onClick={handleCancel}>Cancel</button> 
                                       : <button to={`/tournament/details/${_id}/checkout`} className="btn btn-success" onClick={handleCheckout}>Buy Now</button> 
                                  : <Link to={`/tournament/details/${_id}`}><button>Join Now</button></Link>
            }
          </div>
        </div>
      </div>

      {
        isWishListed ?
        <div className={styles.control_icons} >
          <HiMinusCircle onClick={() => dispatch(removeFromWishList(tournament._id))} title="Remove from Reading" className={styles.minus_icon} />
        </div>
        : 
        <div className={styles.control_icons} >
          <HiPlusCircle onClick={() => dispatch(addToWishList(tournament))} title="Add to Reading" className={styles.plus_icon} />
        </div>
      }

    </div>
  );
};

export default Tournaments;
