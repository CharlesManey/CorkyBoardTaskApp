import AuthForm from "../components/AuthForm";


function LandingPage() {
  return (
    <div>
      <header style={{textAlign: 'center'}}>
        <h1 style={{ marginTop: '0', paddingTop: '20px' }}>Corky Board</h1>
        <h3>Task Management Made Easy</h3>
      </header>
      <AuthForm />
    </div>
  )
}

export default LandingPage;