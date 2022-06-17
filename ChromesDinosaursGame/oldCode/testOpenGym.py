import gym
import universe
# https://medium.freecodecamp.org/how-to-build-an-ai-game-bot-using-openai-gym-and-universe-f2eb9bfbb40a
env = gym.make("flashgames.NeonRace-v0")
env.configure(remotes=1) # creates a local docker container

#creates a list of possible observations? how
# It represents what was observed, such as the raw pixel data 
# on the screen or the game status/score.
observation_n = env.reset()

while True:
    action_n = [[('KeyEvent', 'ArrowUp', True)] for ob in observation_n]
    observation_n, reward_n, done_n, info = env.step(action_n)
    print ("observation: ", observation_n) # Observation of the environment
    print ("reward: ", reward_n) # If the action had any postive impact +1/-1
    env.render()