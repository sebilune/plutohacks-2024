const SaffirSimpsonScale = () => {
  const scaleData = [
    { category: 1, windSpeed: '74-95', damage: 'Some', landfallCategory: 'Hurricane Katrina (2005)' },
    { category: 2, windSpeed: '96-110', damage: 'Extensive', landfallCategory: 'Hurricane Ike (2008)' },
    { category: 3, windSpeed: '111-129', damage: 'Devastating', landfallCategory: 'Hurricane Wilma (2005)' },
    { category: 4, windSpeed: '130-156', damage: 'Catastrophic', landfallCategory: 'Hurricane Helene (2024)' },
    { category: 5, windSpeed: '157+', damage: 'Catastrophic', landfallCategory: 'Hurricane Adnrew (1992)' },
  ];

  return (
    <div>
      <h2>Saffir-Simpson Hurricane Wind Scale</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Wind Speed (MPH)</th>
            <th>Damage</th>
          </tr>
        </thead>
        <tbody>
          {scaleData.map((scale) => (
            <tr key={scale.category}>
              <td>{scale.category}</td>
              <td>{scale.windSpeed}</td>
              <td>{scale.damage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SaffirSimpsonScale;
