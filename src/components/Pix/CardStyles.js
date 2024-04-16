// CardStyles.js
const styles = {
    card: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      margin: '20px',
      width: '80%', // Ajuste a largura conforme necessário
      height: '15%',
      overflow: 'hidden',
      position: 'relative',
      textAlign: 'center',
    },
    image: {
        borderRadius:'4px 0 0 4px',
      },
    content: {
      padding: '10px',
    },
    title: {
      fontSize: '1.2em',
      margin: '10px 0',
      color: '#333',
    },
    description: {
      fontSize: '1em',
      color: '#ffffff',
    },
  };
  
  export default styles;
  