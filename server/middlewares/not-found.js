const notFound = (req, res) => {
  return res.status(404).json({ msg: 'Route Not Found!' });
};

export default notFound;
