const UserCard = ({ user }) => {
  if (!user) {
    return null;
  }
  
  const { firstName, lastName, about, imageUrl, age, gender } = user;
  return (
    <div className="card bg-base-100 w-96 shadow-sm justify-center mx-auto my-20">
      <figure>
        <img src={imageUrl} alt="User Image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-success">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
