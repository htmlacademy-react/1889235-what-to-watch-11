import { Oval } from 'react-loader-spinner';

export default function Spinner(): JSX.Element {
  return (
    <Oval
      height={80}
      width={80}
      color="#000000"
      wrapperStyle={{
        width: '100px',
        margin: '300px auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '100px',
      }}
      wrapperClass=""
      visible
      ariaLabel='oval-spinner'
      secondaryColor="#DDDDDD"
      strokeWidth={5}
      strokeWidthSecondary={2}
    />
  );
}
