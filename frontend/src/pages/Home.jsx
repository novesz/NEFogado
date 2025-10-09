import React from 'react';
import Header from '../commponents/Header';
import Napraforgo from '../commponents/Napraforgo';
import Szallas from '../commponents/Szallas';
import Torpe from '../commponents/Torpe';
import Foglaltsag from '../commponents/Foglaltsag';
import Kihasznaltsag from '../commponents/Kihasznaltsag';


function Home() {
    return(
        <>
            <div className="home">
                    <div className='fej'>
                        <Header />
                    </div>
                <div className="container">
                    <div className="row">
                    
                        <div id='elsoOszlop' className="col-md-4 col-sm-6">
                            <Napraforgo />
                        </div>
                        
                        <div id='masodikOszlop' className="col-md-4 col-sm-6">
                            <Szallas />
                        </div>

                        <div id='harmadikOszlop' className="col-md-4 col-sm-6">
                            <Torpe />
                        </div>
                    </div>
                </div>
            </div>
            <div className='Footer'>
                <div className="container">
                    <div className="row">
                        <div id='alsoFog' className="col-md-6 col-sm-6">
                            <Foglaltsag/>
                        </div>
                        <div id='alsoKi' className="col-md-6 col-sm-6">
                            <Kihasznaltsag/>
                        </div>       
                    </div>
                </div>
            </div>

        </>
    );
}

export default Home