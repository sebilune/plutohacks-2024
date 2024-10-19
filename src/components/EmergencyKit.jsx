import waterCase from "../assets/img/png/watercase.png"; // adjust the path as necessary
import batteries from "../assets/img/png/batteries.png";
import charger from "../assets/img/png/charger.png";
import firstAid from "../assets/img/png/first-aid.png";
import medication from "../assets/img/png/medication.png";
import radio from "../assets/img/png/radio.png";
import cash from "../assets/img/png/cash.png";
import cannedGoods from "../assets/img/png/canned-goods.png";
import petCare from "../assets/img/png/pet-care.png";
import babySupplies from "../assets/img/png/baby-supplies.png";
import gasoline from "../assets/img/png/gasoline.png";

const EmergencyKit = () => {

    return (
        <div>
            <h2>
                Emergency Kit Hurricane Checklist
            </h2>

            <table>
                <tr>
                    <td><img width="120" src={waterCase} alt="Case of water bottles" /><p>Water</p></td>
                    <td><img width="110" src={batteries} alt="Batteries" /><p>Batteries</p></td>
                    <td><img width="220" src={charger} alt="Charger" /><p>Phone Chargers</p></td>
                </tr>
                <tr>
                    <td><img width="120" src={firstAid} alt="First Aid" /><p>First Aid</p></td>
                    <td><img width="100" src={medication} alt="Medicine Bottle" /><p>Medications & prescriptions</p></td>
                    <td><img width="110" src={radio} alt="Radio" /><p>Radio</p></td>
                </tr>
                <tr>
                    <td><img width="130" src={cash} alt="Dollar bills" /><p>Cash (banks and ATMs may not be available after the storm)</p></td>
                    <td><img width="230" src={cannedGoods} alt="Canned goods" /><p>Non perishable packaged canned food and beverages</p></td>
                    <td><img width="130" src={petCare} alt="Pet care items" /><p>Pet care items</p></td>
                </tr>
                <tr>
                    <td><img width="110" src={babySupplies} alt="Baby supplies" /><p>Baby supplies</p></td>
                    <td><img width="135" src={gasoline} alt="Gas jug" /><p>Motor vehicle tanks filled with gas</p></td>
                </tr>
            </table>
        </div>
    )
}

export default EmergencyKit;