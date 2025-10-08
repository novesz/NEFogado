import React from 'react';
import Header from '../commponents/Header';
import Napraforgo from '../commponents/Napraforgo';
import Szallas from '../commponents/Szallas';
import Torpe from '../commponents/Torpe';


function Home() {
    return(
        <div className="home">
                <div className='fej'>
                    <Header />
                </div>
            <div className="container">
                <div className="row">
                
                    <div id='elsoOszlop' className="col-4">
                        <Napraforgo />
                    </div>
                    
                    <div id='masodikOszlop' className="col-4">
                        <Szallas />
                    </div>

                    <div id='harmadikOszlop' className="col-4">
                        <Torpe />
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Home