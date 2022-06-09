import React, { useEffect } from 'react';
import './MyAccount.css';
import MetaData from '../../component/layout/title/MetaData';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../../component/layout/loader/Loader';

function MyAccount({ user }) {

    //To navigate
    const navigate = useNavigate();

    //Get the value from state
    const { loading, isAuthenticated } = useSelector(state => state.user);

    //useEffect
    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated,user])

    return (
        <>
            {loading ? <Loader /> :
                <>
                    <MetaData title={`${user.name}'s Account`} />

                    <div className="accountContainer">
                        <div>
                            <img src={user.avatar.url} alt={user.name} />
                            <Link to="/account/update">Edit Profile</Link>
                        </div>
                        <div>   
                            <h1 className="heading">My Profile</h1>
                            <div>
                                <h4>Full Name:</h4>
                                <p>{user.name}</p>
                            </div>
                            <div>
                                <h4>Email:</h4>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <h4>User Created On:</h4>
                                <p>{String(user.createdAt).substring(0, 10)}</p>
                            </div>
                            <div>
                                <Link to="/orders">My Orders</Link>
                                <Link to="/account/password/update">Change Password</Link>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default MyAccount