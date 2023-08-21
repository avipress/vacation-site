import dal_mysql from "../Utils/dal_mysql";
import { OkPacket } from "mysql";
import vacations from "../Models/vac";

const addVac = async (newVac: vacations) => {
    try {
      const sqlCommand = `
        INSERT INTO vacation (destination, description, start_date, end_date, price, image_url)
        VALUES ('${newVac.destination}', "${newVac.description}", '${newVac.start_date}', '${newVac.end_date}', '${newVac.price}', '${newVac.image_url}')
      `;
      const result: OkPacket = await dal_mysql.execute(sqlCommand);
      newVac.id = result.insertId;
      return newVac;
    } catch (error) {
      console.error('Error adding vacation:', error);
      throw error;
    }
  };
  

const deleteVac = async (id: number) => {
    const sqlCommand = `DELETE FROM vacation WHERE id=${id}`;
    await dal_mysql.execute(sqlCommand);
}

const updateVac = async (updateVac: vacations) => {
    const sqlCommand = `
    UPDATE vacation SET
    destination = '${updateVac.destination}',
    description = '${updateVac.description}',
    start_date = '${updateVac.start_date}',
    end_date = '${updateVac.end_date}',
    price = '${updateVac.price}',
    image_url = '${(updateVac.image_url)}'
    WHERE (id=${updateVac.id})
    `;
    await dal_mysql.execute(sqlCommand);
}


const getVacList = async () => {
    const sqlCommand = `SELECT * FROM vacation`;
    const users = await dal_mysql.execute(sqlCommand);
    return users;
}

const getVacById = async (id: number) => {
    const sqlCommand = `SELECT * FROM vacation WHERE id=${id}`;
    const vacation = await dal_mysql.execute(sqlCommand);
    return vacation[0];
}

const test = () => {
    return "all working :)";
}

export default {
    addVac, deleteVac, updateVac,  getVacList, test,getVacById,
}