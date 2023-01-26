import React from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';

const Page404 = () => {
    const history = useHistory();
    return (
        <>
            <div className="errorBody NotFound-body">
                <div className="error">
                    <div className="wrap">
                        
                            <code>
                                <span className="green">&lt;!</span>
                                <span>DOCTYPE html</span>
                                <span className="green">&gt;</span>
                                <br />
                                <span className="orange">&lt;html&gt;</span>
                                <br />
                                <span className="orange">&lt;style&gt;</span>
                                <br />* {`{`}
                                <br />
                                <span className="green">everything</span>:<span className="blue">awesome</span>;
                                <br />
                                {`}`}
                                <br />
                                <span className="orange">&lt;/style&gt;</span>
                                <br />
                                <span className="orange">&lt;body&gt;</span>
                                <br />
                                ERROR 404! FILE NOT FOUND!
                                <br />
                                <span className="comment">
                                    &lt;!--The file you are looking for, is not where you think it is.--&gt;
                                    <br />
                                </span>
                                <span className="orange"></span>
                                <br />
                                <span className="border p-2 m-2 cursor-pointer" onClick={() => history.push('/home')} >&lt;button&gt; <b>Go to Home</b> &lt;/button&gt;</span>
                                <br />
                                <br />
                                <span className="orange">&nbsp;&lt;/body&gt;</span>
                                <br />
                                <span className="orange">&lt;/html&gt;</span>
                                <br />
                            </code>
                        
                        <span className="info"></span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page404;
