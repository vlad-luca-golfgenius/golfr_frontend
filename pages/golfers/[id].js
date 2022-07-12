import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import ScoreCard from '../../components/ScoreCard'
import useUser from '../../lib/useUser'

const Profile = () => {
  const router = useRouter()
  const { id } = router.query
  const { profile, error } = useUser(id)

  return (
    <Layout>
      <>
        {error ? (error) : (
          <>
            {profile ? (
              <div>
                <h2>{profile.user.name}</h2>
                <h3>{profile.user.email}</h3>
                {profile.scores && profile.scores.map(score => (
                  <ScoreCard
                    key={score.id}
                    id={score.id}
                    totalScore={score.total_score}
                    playedAt={score.played_at}
                    userId={profile.user.id}
                    userName={profile.user.name}
                  />
                ))}
              </div>
            ) : (
              'Loading.....'
            )}

          </>
        )}
      </>
    </Layout>
  )
}

export default Profile
