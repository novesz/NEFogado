import React from "react";


function Szallas(){
    return(
        <div className="szallasdiv">
                <h3 id="cim">Falusi szálláshely fajtái</h3>

                      <ul className="lists">
                        <li>Vendégszoba: a vendégek rendelkezésére bocsátható önálló lakóegység, amely egy lakóhelyiségből, és a minősítéstől függően a hozzátartozó mellékhelyiségekből áll.</li>
                        <li>Lakrész: önálló épület kettő, illetve több szobából álló lehatárolt része a minősítéstől függően hozzátartozó mellékhelyiségekkel együtt</li>
                        <li>Vendégház: önálló épület, több szobával, mellékhelyiségekkel és főzési lehetőséggel rendelkező lakó-, illetve üdülőegység, családok vagy kisebb csoportok elszállásolására.</li>
                        <li>Sátorozóhely: csak valamelyik falusi szálláshely típus mellett, mintegy azt kiegészítve üzemeltethető az előírt feltételek megléte esetén. Pl.: falusi vendégház sátorozóhellyel.</li>
                      </ul>
                      <img src="/ketagyas.jpg" alt="ketagyasKep" className="ketagyKep"/>
                      <p>

                      </p>
            </div>
    );
}
export default Szallas;