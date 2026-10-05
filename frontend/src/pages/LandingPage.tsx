import AuthForm from "../components/AuthForm";


function LandingPage() {
  return (
    <div>
      <header style={{textAlign: 'center'}}>
        <h1>Corky Board</h1>
        <h3>Task Management Made Easy</h3>
      </header>
      <AuthForm />
    </div>
  )
}

export default LandingPage;