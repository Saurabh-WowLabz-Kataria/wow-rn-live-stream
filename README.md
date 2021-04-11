# react-native-wow-rn-live-stream

Live streaming component which is a custom wrapper on top of React Native Jitsi (https://github.com/skrafft/react-native-jitsi-meet)

## Installation


```bash
$ npm install react-native-wow-rn-live-stream --save
```

## Usage

```javascript
import { LiveStreamComp } from 'react-native-wow-rn-live-stream';
import { HOST, ATTENDEE} from 'react-native-wow-rn-live-stream';  //User Types

<LiveStreamComp
     callUrl={url}
     user={userType}
     userName={userName}
     email={email}
     userImageUrl={userImageUrl}
     onCallEnded={}  // Callback when the stream has ended/>
```
You can set the base URL of self-hosted jitsi server
```
import { setBaseUrl } from 'react-native-wow-rn-live-stream';


setBaseUrl("YOUR_CUSTOM_URL");
```

A complete working example is attached in the repo.

## Contact Us
```java
saurabh.kataria@wowlabz.com
contact@wowlabz.com
```
## License
[MIT](https://choosealicense.com/licenses/mit/)