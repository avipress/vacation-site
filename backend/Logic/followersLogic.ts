import followers from "../Models/followers";
import vacations from "../Models/vac";
import dal_mysql from "../Utils/dal_mysql";

const addFollow = async (user_id: number, vacation_id: number) => {
    const sqlCommand = `
      INSERT INTO followers (user_id, vacation_id)
      VALUES (${user_id}, ${vacation_id}) 
      
    `;
    await dal_mysql.execute(sqlCommand);
  };

  const updateFollow = async () => {
    const sqlCommand = `
    UPDATE vacation SET followers_count = (
      SELECT COUNT(*)
      FROM followers
      WHERE followers.vacation_id = vacation.id
    )
    WHERE id ;
    `;
    await dal_mysql.execute(sqlCommand);
};

  const getFollowersByVac = async (vacationId: number) => {
    const sqlCommand = `
    SELECT count(*) as totalFollowed FROM vacations.followers where vacation_id=${vacationId}
    `;
    const followers = await dal_mysql.execute(sqlCommand);
    return followers;
  };
  

  const getFollowerVac = async (userId: number) => {
    const sqlCommand = `
      SELECT siteusers.id AS user_id, followers.vacation_id
      FROM siteusers
      INNER JOIN followers ON siteusers.id = followers.user_id
      WHERE followers.user_id = ${userId}
    `;
    const followers = await dal_mysql.execute(sqlCommand);
    return followers;
  };
  const getAllFollowers = async () => {
    const sqlCommand = `SELECT * FROM followers;`;
    const users = await dal_mysql.execute(sqlCommand);
    return users;
}

const totalFollows = async ()=> {
  const sqlCommand = `SELECT vacation_id, COUNT(*) AS total, destination
  FROM followers 
  INNER JOIN vacation ON vacation_id = id
  GROUP BY vacation_id, destination;
`
  const total = await dal_mysql.execute(sqlCommand);
  return total;
};

const totalById = async (vacation_id:number)=> {
  const sqlCommand = `SELECT COUNT(*) FROM followers
   WHERE vacation_id = ${vacation_id};
`
  const total = await dal_mysql.execute(sqlCommand);
  return total;
};

const deleteFollow = async (user_id: number, vacation_id: number) => {
    const sqlCommand = `
      DELETE FROM followers
      WHERE user_id = ${user_id} AND vacation_id = ${vacation_id}
    `;
    await dal_mysql.execute(sqlCommand);
  };

export default {
  addFollow,
  getFollowersByVac,
  getFollowerVac,
  getAllFollowers,
  deleteFollow,
  totalFollows,
  totalById,
  updateFollow
};
