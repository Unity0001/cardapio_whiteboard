import MainDiv from "./components/main_div";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center pl-8 pr-8">
      <MainDiv>
        <a href="/" className="flex justify-end items-center p-4">
          <img src="/user-favicon.png" alt="user-login" className="h-24 w-24"/>
        </a>
      </MainDiv>
    </div>
  );
}