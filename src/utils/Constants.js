
export const USER_TYPE = "userType";
export const HOST = "host";
export const CO_HOST = "coHost";
export const ATTENDEE = "attendee";
export const ITEM_SEPERATOR = "/";

//Fiebase constants
export const CHATS = "/chat/chats";
export const CHATS_COUNT = "/chat/totalComments";
export const TOTAL_AUDIENCE = "/callStatus/totalAudience";
export const CHAT_VISIBILITY = "/callStatus/chatVisible";
export const SELECTED_EMOJI_ARRAY = "/callStatus/reactionsArray";
export const EMOTICONS_STATUS = "/callStatus/reactionVisible";
export const CALL_STATUS = "/callStatus/isActive";
export const HOST_UID = "/callStatus/hostUid";
export const CO_HOST_UID = "/callStatus/coHostUid";
export const AUDIO_STATUS = "/callStatus/isAudioOn";
export const VIDEO_STATUS = "/callStatus/isVideoOn";
export const ACTIVE_ROOMS_LIST = "/activeRooms";
export const SET_CALL_STATUS = "/callStatus";
export const REACTIONS_ROOT = "/reactions";
export const ACTIVITY_MAP = "/activityMap";
export const QUESTIONS = "/questions";

// Stream Quality
export const NORMAL = "normal";
export const PREMIUM = "premium";

export var BASE_URL = "https://meet.jit.si/";
export var INITIAL_REACTIONS = {
}

export function setBaseUrl(baseUrl) {
    BASE_URL = baseUrl;
}

export function setInitialReactions(reactionObject) {
    INITIAL_REACTIONS = reactionObject;
}

export var DEFAULT_EMOTICONS = {
    "heart_eyes": 0,
    "clap": 0,
    "hand": 0,
    "orange_heart": 0,
    "thumbsup": 0
}

export const DEFAULT_EMOTICON_ARRAY = [
    "๐",
    "๐",
    "โ",
    "๐งก",
    "๐"
]

export const EMOTICONS =
{
    "100": "๐ฏ",
    "zipper_mouth_face": "๐ค",
    "money_mouth_face": "๐ค",
    "face_with_thermometer": "๐ค",
    "nerd_face": "๐ค",
    "thinking_face": "๐ค",
    "face_with_head_bandage": "๐ค",
    "robot_face": "๐ค",
    "hugging_face": "๐ค",
    "the_horns": "๐ค",
    "call_me_hand": "๐ค",
    "raised_back_of_hand": "๐ค",
    "left-facing_fist": "๐ค",
    "right-facing_fist": "๐ค",
    "handshake": "๐ค",
    "crossed_fingers": "๐ค",
    "hand_with_index_and_middle_fingers_crossed": "๐ค",
    "i_love_you_hand_sign": "๐ค",
    "face_with_cowboy_hat": "๐ค?",
    "clown_face": "๐คก",
    "nauseated_face": "๐คข",
    "rolling_on_the_floor_laughing": "๐คฃ",
    "drooling_face": "๐คค",
    "lying_face": "๐คฅ",
    "woman-facepalming": "๐คฆโโ๏ธ",
    "man-facepalming": "๐คฆโโ๏ธ",
    "face_palm": "๐คฆ",
    "sneezing_face": "๐คง",
    "face_with_raised_eyebrow": "๐คจ",
    "face_with_one_eyebrow_raised": "๐คจ",
    "star-struck": "๐คฉ",
    "grinning_face_with_star_eyes": "๐คฉ",
    "zany_face": "๐คช",
    "grinning_face_with_one_large_and_one_small_eye": "๐คช",
    "shushing_face": "๐คซ",
    "face_with_finger_covering_closed_lips": "๐คซ",
    "face_with_symbols_on_mouth": "๐คฌ",
    "serious_face_with_symbols_covering_mouth": "๐คฌ",
    "face_with_hand_over_mouth": "๐คญ",
    "smiling_face_with_smiling_eyes_and_hand_covering_mouth": "๐คญ",
    "face_vomiting": "๐คฎ",
    "face_with_open_mouth_vomiting": "๐คฎ",
    "exploding_head": "๐คฏ",
    "shocked_face_with_exploding_head": "๐คฏ",
    "pregnant_woman": "๐คฐ",
    "breast-feeding": "๐คฑ",
    "palms_up_together": "๐คฒ",
    "selfie": "๐คณ",
    "prince": "๐คด",
    "man_in_tuxedo": "๐คต",
    "mrs_claus": "๐คถ",
    "mother_christmas": "๐คถ",
    "woman-shrugging": "๐คทโโ๏ธ",
    "man-shrugging": "๐คทโโ๏ธ",
    "fist": "โ",
    "hand": "โ",
    // "raised_hand": "โ",
    "rainbow": "๐",
    "earth_africa": "๐",
    "new_moon": "๐",
    "waxing_crescent_moon": "๐",
    "first_quarter_moon": "๐",
    "moon": "๐",
    "waxing_gibbous_moon": "๐",
    "full_moon": "๐",
    "waning_gibbous_moon": "๐",
    "last_quarter_moon": "๐",
    "waning_crescent_moon": "๐",
    "crescent_moon": "๐",
    "new_moon_with_face": "๐",
    "first_quarter_moon_with_face": "๐",
    "last_quarter_moon_with_face": "๐",
    "full_moon_with_face": "๐",
    "sun_with_face": "๐",
    "point_up_2": "๐",
    "point_down": "๐",
    "point_left": "๐",
    "point_right": "๐",
    "facepunch": "๐",
    "punch": "๐",
    "wave": "๐",
    "ok_hand": "๐",
    // "+1": "๐",
    "thumbsup": "๐",
    "-1": "๐",
    "thumbsdown": "๐",
    "clap": "๐",
    "open_hands": "๐",
    "crown": "๐",
    "star2": "๐",
    "thermometer": "๐ก๏ธ",
    "mostly_sunny": "๐ค๏ธ",
    "sun_small_cloud": "๐ค๏ธ",
    "snow_cloud": "๐จ๏ธ",
    "lightning": "๐ฉ๏ธ",
    "tornado_cloud": "๐ช๏ธ",
    "wind_blowing_face": "๐ฌ๏ธ",
    "hotdog": "๐ญ",
    "taco": "๐ฎ",
    "tulip": "๐ท",
    "cherry_blossom": "๐ธ",
    "rose": "๐น",
    "hibiscus": "๐บ",
    "sunflower": "๐ป",
    "blossom": "๐ผ",
    "corn": "๐ฝ",
    "herb": "๐ฟ",
    "four_leaf_clover": "๐",
    "maple_leaf": "๐",
    "mushroom": "๐",
    "tomato": "๐",
    "eggplant": "๐",
    "grapes": "๐",
    "melon": "๐",
    "watermelon": "๐",
    "tangerine": "๐",
    "lemon": "๐",
    "banana": "๐",
    "pineapple": "๐",
    "apple": "๐",
    "green_apple": "๐",
    "pear": "๐",
    "peach": "๐",
    "cherries": "๐",
    "strawberry": "๐",
    "hamburger": "๐",
    "pizza": "๐",
    "ramen": "๐",
    "spaghetti": "๐",
    "fries": "๐",
    "icecream": "๐ฆ",
    "ice_cream": "๐จ",
    "chocolate_bar": "๐ซ",
    "candy": "๐ฌ",
    "lollipop": "๐ญ",
    "fork_and_knife": "๐ด",
    "tea": "๐ต",
    "wine_glass": "๐ท",
    "cocktail": "๐ธ",
    "tropical_drink": "๐น",
    "beer": "๐บ",
    "beers": "๐ป",
    "baby_bottle": "๐ผ",
    "knife_fork_plate": "๐ฝ๏ธ",
    "champagne": "๐พ",
    "popcorn": "๐ฟ",
    "ribbon": "๐",
    "gift": "๐",
    "birthday": "๐",
    "jack_o_lantern": "๐",
    "tada": "๐",
    "confetti_ball": "๐",
    "microphone": "๐ค",
    "ticket": "๐ซ",
    "clapper": "๐ฌ",
    "performing_arts": "๐ญ",
    "video_game": "๐ฎ",
    "dart": "๐ฏ",
    "8ball": "๐ฑ",
    "musical_note": "๐ต",
    "notes": "๐ถ",
    "guitar": "๐ธ",
    "musical_keyboard": "๐น",
    "tennis": "๐พ",
    "basketball": "๐",
    "checkered_flag": "๐",
    "snowboarder": "๐",
    "runner": "๐โโ๏ธ",
    "running": "๐โโ๏ธ",
    "surfer": "๐โโ๏ธ",
    "sports_medal": "๐",
    "trophy": "๐",
    "football": "๐",
    "golfer": "๐๏ธโโ๏ธ",
    "racing_motorcycle": "๐๏ธ",
    "racing_car": "๐๏ธ",
    "cricket_bat_and_ball": "๐",
    "volleyball": "๐",
    "field_hockey_stick_and_ball": "๐",
    "ice_hockey_stick_and_puck": "๐",
    "table_tennis_paddle_and_ball": "๐",
    "rat": "๐",
    "mouse2": "๐",
    "ox": "๐",
    "water_buffalo": "๐",
    "cow2": "๐",
    "tiger2": "๐",
    "leopard": "๐",
    "rabbit2": "๐",
    "cat2": "๐",
    "dragon": "๐",
    "crocodile": "๐",
    "whale2": "๐",
    "snail": "๐",
    "snake": "๐",
    "racehorse": "๐",
    "ram": "๐",
    "goat": "๐",
    "sheep": "๐",
    "monkey": "๐",
    "rooster": "๐",
    "chicken": "๐",
    "dog2": "๐",
    "pig2": "๐",
    "boar": "๐",
    "elephant": "๐",
    "octopus": "๐",
    "shell": "๐",
    "bug": "๐",
    "ant": "๐",
    "bee": "๐",
    "honeybee": "๐",
    "beetle": "๐",
    "fish": "๐",
    "tropical_fish": "๐?",
    "blowfish": "๐ก",
    "turtle": "๐ข",
    "hatching_chick": "๐ฃ",
    "baby_chick": "๐ค",
    "hatched_chick": "๐ฅ",
    "bird": "๐ฆ",
    "penguin": "๐ง",
    "koala": "๐จ",
    "poodle": "๐ฉ",
    "dromedary_camel": "๐ช",
    "camel": "๐ซ",
    "dolphin": "๐ฌ",
    "flipper": "๐ฌ",
    "mouse": "๐ญ",
    "cow": "๐ฎ",
    "tiger": "๐ฏ",
    "rabbit": "๐ฐ",
    "cat": "๐ฑ",
    "dragon_face": "๐ฒ",
    "whale": "๐ณ",
    "horse": "๐ด",
    "monkey_face": "๐ต",
    "dog": "๐ถ",
    "pig": "๐ท",
    "frog": "๐ธ",
    "hamster": "๐น",
    "wolf": "๐บ",
    "bear": "๐ป",
    "panda_face": "๐ผ",
    "pig_nose": "๐ฝ",
    "feet": "๐พ",
    "eyes": "๐",
    "eye-in-speech-bubble": "๐๏ธโ๐จ๏ธ",
    "eye": "๐๏ธ",
    "ear": "๐",
    "nose": "๐",
    "lips": "๐",
    "tongue": "๐",
    "womans_hat": "๐",
    "eyeglasses": "๐",
    "necktie": "๐",
    "shirt": "๐",
    "tshirt": "๐",
    "jeans": "๐",
    "dress": "๐",
    "kimono": "๐",
    "bikini": "๐",
    "womans_clothes": "๐",
    "shoe": "๐",
    "athletic_shoe": "๐",
    "high_heel": "๐?",
    "sandal": "๐ก",
    "boot": "๐ข",
    "footprints": "๐ฃ",
    "bust_in_silhouette": "๐ค",
    "busts_in_silhouette": "๐ฅ",
    "boy": "๐ฆ",
    "girl": "๐ง",
    "male-farmer": "๐จโ๐พ",
    "male-cook": "๐จโ๐ณ",
    "male-student": "๐จโ๐",
    "male-singer": "๐จโ๐ค",
    "male-artist": "๐จโ๐จ",
    "male-teacher": "๐จโ๐ซ",
    "male-factory-worker": "๐จโ๐ญ",
    "man-boy-boy": "๐จโ๐ฆโ๐ฆ",
    "man-boy": "๐จโ๐ฆ",
    "man-girl-boy": "๐จโ๐งโ๐ฆ",
    "man-girl-girl": "๐จโ๐งโ๐ง",
    "man-girl": "๐จโ๐ง",
    "man-man-boy": "๐จโ๐จโ๐ฆ",
    "man-man-boy-boy": "๐จโ๐จโ๐ฆโ๐ฆ",
    "man-man-girl": "๐จโ๐จโ๐ง",
    "man-man-girl-boy": "๐จโ๐จโ๐งโ๐ฆ",
    "man-man-girl-girl": "๐จโ๐จโ๐งโ๐ง",
    "man-woman-boy": "๐จโ๐ฉโ๐ฆ",
    "family": "๐จโ๐ฉโ๐ฆ",
    "man-woman-boy-boy": "๐จโ๐ฉโ๐ฆโ๐ฆ",
    "man-woman-girl": "๐จโ๐ฉโ๐ง",
    "man-woman-girl-boy": "๐จโ๐ฉโ๐งโ๐ฆ",
    "man-woman-girl-girl": "๐จโ๐ฉโ๐งโ๐ง",
    "male-technologist": "๐จโ๐ป",
    "male-office-worker": "๐จโ๐ผ",
    "male-mechanic": "๐จโ๐ง",
    "male-scientist": "๐จโ๐ฌ",
    "male-astronaut": "๐จโ๐",
    "male-firefighter": "๐จโ๐",
    "male-doctor": "๐จโโ๏ธ",
    "male-judge": "๐จโโ๏ธ",
    "male-pilot": "๐จโโ๏ธ",
    "man-heart-man": "๐จโโค๏ธโ๐จ",
    "man-kiss-man": "๐จโโค๏ธโ๐โ๐จ",
    "man": "๐จ",
    "female-farmer": "๐ฉโ๐พ",
    "female-cook": "๐ฉโ๐ณ",
    "female-student": "๐ฉโ๐",
    "female-singer": "๐ฉโ๐ค",
    "female-artist": "๐ฉโ๐จ",
    "female-teacher": "๐ฉโ๐ซ",
    "female-factory-worker": "๐ฉโ๐ญ",
    "woman-boy-boy": "๐ฉโ๐ฆโ๐ฆ",
    "woman-boy": "๐ฉโ๐ฆ",
    "woman-girl-boy": "๐ฉโ๐งโ๐ฆ",
    "woman-girl-girl": "๐ฉโ๐งโ๐ง",
    "woman-girl": "๐ฉโ๐ง",
    "woman-woman-boy": "๐ฉโ๐ฉโ๐ฆ",
    "woman-woman-boy-boy": "๐ฉโ๐ฉโ๐ฆโ๐ฆ",
    "woman-woman-girl": "๐ฉโ๐ฉโ๐ง",
    "woman-woman-girl-boy": "๐ฉโ๐ฉโ๐งโ๐ฆ",
    "woman-woman-girl-girl": "๐ฉโ๐ฉโ๐งโ๐ง",
    "female-technologist": "๐ฉโ๐ป",
    "female-office-worker": "๐ฉโ๐ผ",
    "female-mechanic": "๐ฉโ๐ง",
    "female-scientist": "๐ฉโ๐ฌ",
    "female-astronaut": "๐ฉโ๐",
    "female-firefighter": "๐ฉโ๐",
    "female-doctor": "๐ฉโโ๏ธ",
    "female-judge": "๐ฉโโ๏ธ",
    "female-pilot": "๐ฉโโ๏ธ",
    "woman-heart-man": "๐ฉโโค๏ธโ๐จ",
    "couple_with_heart": "๐ฉโโค๏ธโ๐จ",
    "woman-heart-woman": "๐ฉโโค๏ธโ๐ฉ",
    "woman-kiss-man": "๐ฉโโค๏ธโ๐โ๐จ",
    "couplekiss": "๐ฉโโค๏ธโ๐โ๐จ",
    "woman-kiss-woman": "๐ฉโโค๏ธโ๐โ๐ฉ",
    "woman": "๐ฉ",
    "couple": "๐ซ",
    "man_and_woman_holding_hands": "๐ซ",
    "two_men_holding_hands": "๐ฌ",
    "two_women_holding_hands": "๐ญ",
    "female-police-officer": "๐ฎโโ๏ธ",
    "male-police-officer": "๐ฎโโ๏ธ",
    "cop": "๐ฎโโ๏ธ",
    "woman-with-bunny-ears-partying": "๐ฏโโ๏ธ",
    "dancers": "๐ฏโโ๏ธ",
    "man-with-bunny-ears-partying": "๐ฏโโ๏ธ",
    "bride_with_veil": "๐ฐ",
    "blond-haired-woman": "๐ฑโโ๏ธ",
    "blond-haired-man": "๐ฑโโ๏ธ",
    "person_with_blond_hair": "๐ฑโโ๏ธ",
    "man_with_gua_pi_mao": "๐ฒ",
    "woman-wearing-turban": "๐ณโโ๏ธ",
    "man-wearing-turban": "๐ณโโ๏ธ",
    "man_with_turban": "๐ณโโ๏ธ",
    "older_man": "๐ด",
    "older_woman": "๐ต",
    "baby": "๐ถ",
    "construction_worker": "๐ทโโ๏ธ",
    "princess": "๐ธ",
    "japanese_ogre": "๐น",
    "japanese_goblin": "๐บ",
    "ghost": "๐ป",
    "angel": "๐ผ",
    "alien": "๐ฝ",
    "imp": "๐ฟ",
    "skull": "๐",
    "dancer": "๐",
    "lipstick": "๐",
    "nail_care": "๐",
    "massage": "๐โโ๏ธ",
    "haircut": "๐โโ๏ธ",
    "syringe": "๐",
    "pill": "๐",
    "kiss": "๐",
    "love_letter": "๐",
    "ring": "๐",
    "gem": "๐",
    "heartbeat": "๐",
    "broken_heart": "๐",
    "two_hearts": "๐",
    "sparkling_heart": "๐",
    "heartpulse": "๐",
    "cupid": "๐",
    "blue_heart": "๐",
    "green_heart": "๐",
    "yellow_heart": "๐",
    "purple_heart": "๐",
    "gift_heart": "๐",
    "revolving_hearts": "๐",
    "bulb": "๐ก",
    "anger": "๐ข",
    "bomb": "๐ฃ",
    "zzz": "๐ค",
    "boom": "๐ฅ",
    "collision": "๐ฅ",
    "sweat_drops": "๐ฆ",
    "droplet": "๐ง",
    "dash": "๐จ",
    "poop": "๐ฉ",
    "shit": "๐ฉ",
    "muscle": "๐ช",
    "moneybag": "๐ฐ",
    "credit_card": "๐ณ",
    "yen": "๐ด",
    "dollar": "๐ต",
    "euro": "๐ถ",
    "pound": "๐ท",
    "floppy_disk": "๐พ",
    "date": "๐",
    "pencil": "๐",
    "package": "๐ฆ",
    "iphone": "๐ฑ",
    "speaker": "๐",
    "key": "๐",
    "lock": "๐",
    "unlock": "๐",
    "bell": "๐",
    "link": "๐",
    "underage": "๐",
    "fire": "๐ฅ",
    "flashlight": "๐ฆ",
    "wrench": "๐ง",
    "hammer": "๐จ",
    "knife": "๐ช",
    "gun": "๐ซ",
    "om_symbol": "๐๏ธ",
    "clock1": "๐",
    "female-detective": "๐ต๏ธโโ๏ธ",
    "male-detective": "๐ต๏ธโโ๏ธ",
    "sleuth_or_spy": "๐ต๏ธโโ๏ธ",
    "dark_sunglasses": "๐ถ๏ธ",
    "raised_hand_with_fingers_splayed": "๐๏ธ",
    "middle_finger": "๐",
    "reversed_hand_with_middle_finger_extended": "๐",
    "spock-hand": "๐",
    "black_heart": "๐ค",
    "grinning": "๐",
    "grin": "๐",
    "joy": "๐",
    "smiley": "๐",
    "smile": "๐",
    "sweat_smile": "๐",
    "laughing": "๐",
    "satisfied": "๐",
    "innocent": "๐",
    "smiling_imp": "๐",
    "wink": "๐",
    "blush": "๐",
    "yum": "๐",
    "relieved": "๐",
    "heart_eyes": "๐",
    "sunglasses": "๐",
    "smirk": "๐",
    "neutral_face": "๐",
    "expressionless": "๐",
    "unamused": "๐",
    "sweat": "๐",
    "pensive": "๐",
    "confused": "๐",
    "confounded": "๐",
    "kissing": "๐",
    "kissing_heart": "๐",
    "kissing_smiling_eyes": "๐",
    "kissing_closed_eyes": "๐",
    "stuck_out_tongue": "๐",
    "stuck_out_tongue_winking_eye": "๐",
    "stuck_out_tongue_closed_eyes": "๐",
    "disappointed": "๐",
    "worried": "๐",
    "angry": "๐?",
    "rage": "๐ก",
    "cry": "๐ข",
    "persevere": "๐ฃ",
    "triumph": "๐ค",
    "disappointed_relieved": "๐ฅ",
    "frowning": "๐ฆ",
    "anguished": "๐ง",
    "fearful": "๐จ",
    "weary": "๐ฉ",
    "sleepy": "๐ช",
    "tired_face": "๐ซ",
    "grimacing": "๐ฌ",
    "sob": "๐ญ",
    "open_mouth": "๐ฎ",
    "hushed": "๐ฏ",
    "cold_sweat": "๐ฐ",
    "scream": "๐ฑ",
    "astonished": "๐ฒ",
    "flushed": "๐ณ",
    "sleeping": "๐ด",
    "dizzy_face": "๐ต",
    "no_mouth": "๐ถ",
    "mask": "๐ท",
    "smile_cat": "๐ธ",
    "joy_cat": "๐น",
    "smiley_cat": "๐บ",
    "heart_eyes_cat": "๐ป",
    "smirk_cat": "๐ผ",
    "kissing_cat": "๐ฝ",
    "pouting_cat": "๐พ",
    "crying_cat_face": "๐ฟ",
    "scream_cat": "๐",
    "slightly_frowning_face": "๐",
    "slightly_smiling_face": "๐",
    "upside_down_face": "๐",
    "face_with_rolling_eyes": "๐",
    "woman-gesturing-no": "๐โโ๏ธ",
    "no_good": "๐โโ๏ธ",
    "man-gesturing-no": "๐โโ๏ธ",
    "woman-gesturing-ok": "๐โโ๏ธ",
    "ok_woman": "๐โโ๏ธ",
    "man-gesturing-ok": "๐โโ๏ธ",
    "woman-bowing": "๐โโ๏ธ",
    "man-bowing": "๐โโ๏ธ",
    "bow": "๐โโ๏ธ",
    "see_no_evil": "๐",
    "hear_no_evil": "๐",
    "speak_no_evil": "๐",
    "woman-raising-hand": "๐โโ๏ธ",
    "raising_hand": "๐โโ๏ธ",
    "man-raising-hand": "๐โโ๏ธ",
    "raised_hands": "๐",
    "woman-frowning": "๐โโ๏ธ",
    "person_frowning": "๐โโ๏ธ",
    "man-frowning": "๐โโ๏ธ",
    "woman-pouting": "๐โโ๏ธ",
    "person_with_pouting_face": "๐โโ๏ธ",
    "man-pouting": "๐โโ๏ธ",
    "pray": "๐",
    "rocket": "๐",
    "helicopter": "๐",
    "train": "๐",
    "bus": "๐",
    "no_entry_sign": "๐ซ",
    "smoking": "๐ฌ",
    "no_smoking": "๐ญ",
    "woman-walking": "๐ถโโ๏ธ",
    "man-walking": "๐ถโโ๏ธ",
    "walking": "๐ถโโ๏ธ",
    "toilet": "๐ฝ",
    "shower": "๐ฟ",
    "bath": "๐",

    "croissant": "๐ฅ",
    "avocado": "๐ฅ",
    "cucumber": "๐ฅ",
    "bacon": "๐ฅ",
    "potato": "๐ฅ",
    "carrot": "๐ฅ",
    "baguette_bread": "๐ฅ",
    "green_salad": "๐ฅ",
    "shallow_pan_of_food": "๐ฅ",
    "stuffed_flatbread": "๐ฅ",
    "egg": "๐ฅ",
    "glass_of_milk": "๐ฅ",
    "peanuts": "๐ฅ",
    "kiwifruit": "๐ฅ",
    "pancakes": "๐ฅ",
    "dumpling": "๐ฅ",
    "fortune_cookie": "๐ฅ?",
    "takeout_box": "๐ฅก",
    "chopsticks": "๐ฅข",
    "bowl_with_spoon": "๐ฅฃ",
    "cup_with_straw": "๐ฅค",
    "coconut": "๐ฅฅ",
    "broccoli": "๐ฅฆ",
    "pie": "๐ฅง",
    "lion_face": "๐ฆ",
    "scorpion": "๐ฆ",
    "turkey": "๐ฆ",
    "unicorn_face": "๐ฆ",
    "eagle": "๐ฆ",
    "duck": "๐ฆ",
    "bat": "๐ฆ",
    "shark": "๐ฆ",
    "owl": "๐ฆ",
    "fox_face": "๐ฆ",
    "butterfly": "๐ฆ",
    "deer": "๐ฆ",
    "gorilla": "๐ฆ",
    "lizard": "๐ฆ",
    "rhinoceros": "๐ฆ",
    "shrimp": "๐ฆ",
    "squid": "๐ฆ",
    "face_with_monocle": "๐ง",
    "adult": "๐ง",
    "child": "๐ง",
    "older_adult": "๐ง",
    "bearded_person": "๐ง",
    "female_vampire": "๐งโโ๏ธ",
    "vampire": "๐งโโ๏ธ",
    "male_vampire": "๐งโโ๏ธ",
    "female_genie": "๐งโโ๏ธ",
    "male_genie": "๐งโโ๏ธ",
    "genie": "๐งโโ๏ธ",
    "female_zombie": "๐งโโ๏ธ",
    "male_zombie": "๐งโโ๏ธ",
    "zombie": "๐งโโ๏ธ",
    "brain": "๐ง?",
    "orange_heart": "๐งก",
    "billed_cap": "๐งข",
    "scarf": "๐งฃ",
    "gloves": "๐งค",
    "coat": "๐งฅ",
    "socks": "๐งฆ",
    "information_source": "โน๏ธ",
    "watch": "โ",
    "hourglass": "โ",
    "keyboard": "โจ๏ธ",
    "eject": "โ๏ธ",
    "alarm_clock": "โฐ",
    "stopwatch": "โฑ๏ธ",
    "timer_clock": "โฒ๏ธ",
    "sunny": "โ๏ธ",
    "cloud": "โ๏ธ",
    "umbrella": "โ๏ธ",
    "snowman": "โ๏ธ",
    "comet": "โ๏ธ",
    "phone": "โ๏ธ",
    "telephone": "โ๏ธ",
    "radioactive_sign": "โข๏ธ",
    "peace_symbol": "โฎ๏ธ",
    "yin_yang": "โฏ๏ธ",
    "female_sign": "โ๏ธ",
    "male_sign": "โ๏ธ",
    "gemini": "โ",
    "cancer": "โ",
    "leo": "โ",
    "virgo": "โ",
    "libra": "โ",
    "scorpius": "โ",
    "spades": "โ?๏ธ",
    "clubs": "โฃ๏ธ",
    "hearts": "โฅ๏ธ",
    "diamonds": "โฆ๏ธ",
    "recycle": "โป๏ธ",
    "wheelchair": "โฟ",
    "warning": "โ?๏ธ",
    "white_circle": "โช",
    "black_circle": "โซ",
    "soccer": "โฝ",
    "baseball": "โพ",
    "snowman_without_snow": "โ",
    "partly_sunny": "โ",
    "thunder_cloud_and_rain": "โ๏ธ",
    "no_entry": "โ",
    "church": "โช",
    "mountain": "โฐ๏ธ",
    "golf": "โณ",
    "ferry": "โด๏ธ",
    "boat": "โต",
    "skier": "โท๏ธ",
    "ice_skate": "โธ๏ธ",
    "scissors": "โ๏ธ",
    "airplane": "โ๏ธ",
    "writing_hand": "โ๏ธ",
    "pencil2": "โ๏ธ",
    "heavy_check_mark": "โ๏ธ",
    "sparkle": "โ๏ธ",
    "x": "โ",
    "heart": "โค๏ธ",
    "arrow_right": "โก๏ธ",
    "arrow_heading_up": "โคด๏ธ",
    "arrow_heading_down": "โคต๏ธ",
    "arrow_left": "โฌ๏ธ",
    "arrow_up": "โฌ๏ธ",
    "arrow_down": "โฌ๏ธ",
    "star": "โญ",
    "o": "โญ",
    "flag-ac": "๐ฆ๐จ",
    "flag-ad": "๐ฆ๐ฉ",
    "flag-ae": "๐ฆ๐ช",
    "flag-af": "๐ฆ๐ซ",
    "flag-ag": "๐ฆ๐ฌ",
    "flag-ai": "๐ฆ๐ฎ",
    "flag-al": "๐ฆ๐ฑ",
    "flag-am": "๐ฆ๐ฒ",
    "flag-ao": "๐ฆ๐ด",
    "flag-aq": "๐ฆ๐ถ",
    "flag-ar": "๐ฆ๐ท",
    "flag-as": "๐ฆ๐ธ",
    "flag-at": "๐ฆ๐น",
    "flag-au": "๐ฆ๐บ",
    "flag-aw": "๐ฆ๐ผ",
    "flag-ax": "๐ฆ๐ฝ",
    "flag-az": "๐ฆ๐ฟ",
    "flag-ba": "๐ง๐ฆ",
    "flag-bb": "๐ง๐ง",
    "flag-bd": "๐ง๐ฉ",
    "flag-be": "๐ง๐ช",
    "flag-bf": "๐ง๐ซ",
    "flag-bg": "๐ง๐ฌ",
    "flag-bh": "๐ง๐ญ",
    "flag-bi": "๐ง๐ฎ",
    "flag-bj": "๐ง๐ฏ",
    "flag-bl": "๐ง๐ฑ",
    "flag-bm": "๐ง๐ฒ",
    "flag-bn": "๐ง๐ณ",
    "flag-bo": "๐ง๐ด",
    "flag-bq": "๐ง๐ถ",
    "flag-br": "๐ง๐ท",
    "flag-bs": "๐ง๐ธ",
    "flag-bt": "๐ง๐น",
    "flag-bv": "๐ง๐ป",
    "flag-bw": "๐ง๐ผ",
    "flag-by": "๐ง๐พ",
    "flag-bz": "๐ง๐ฟ",
    "flag-ca": "๐จ๐ฆ",
    "flag-cc": "๐จ๐จ",
    "flag-cd": "๐จ๐ฉ",
    "flag-cf": "๐จ๐ซ",
    "flag-cg": "๐จ๐ฌ",
    "flag-ch": "๐จ๐ญ",
    "flag-ci": "๐จ๐ฎ",
    "flag-ck": "๐จ๐ฐ",
    "flag-cl": "๐จ๐ฑ",
    "flag-cm": "๐จ๐ฒ",
    "cn": "๐จ๐ณ",
    "flag-cn": "๐จ๐ณ",
    "flag-co": "๐จ๐ด",
    "flag-cp": "๐จ๐ต",
    "flag-cr": "๐จ๐ท",
    "flag-cu": "๐จ๐บ",
    "flag-cv": "๐จ๐ป",
    "flag-cw": "๐จ๐ผ",
    "flag-cx": "๐จ๐ฝ",
    "flag-cy": "๐จ๐พ",
    "flag-cz": "๐จ๐ฟ",
    "de": "๐ฉ๐ช",
    "flag-de": "๐ฉ๐ช",
    "flag-dg": "๐ฉ๐ฌ",
    "flag-dj": "๐ฉ๐ฏ",
    "flag-dk": "๐ฉ๐ฐ",
    "flag-dm": "๐ฉ๐ฒ",
    "flag-do": "๐ฉ๐ด",
    "flag-dz": "๐ฉ๐ฟ",
    "flag-ea": "๐ช๐ฆ",
    "flag-ec": "๐ช๐จ",
    "flag-ee": "๐ช๐ช",
    "flag-eg": "๐ช๐ฌ",
    "flag-eh": "๐ช๐ญ",
    "flag-er": "๐ช๐ท",
    "es": "๐ช๐ธ",
    "flag-es": "๐ช๐ธ",
    "flag-et": "๐ช๐น",
    "flag-eu": "๐ช๐บ",
    "flag-fi": "๐ซ๐ฎ",
    "flag-fj": "๐ซ๐ฏ",
    "flag-fk": "๐ซ๐ฐ",
    "flag-fm": "๐ซ๐ฒ",
    "flag-fo": "๐ซ๐ด",
    "fr": "๐ซ๐ท",
    "flag-fr": "๐ซ๐ท",
    "flag-ga": "๐ฌ๐ฆ",
    "gb": "๐ฌ๐ง",
    "uk": "๐ฌ๐ง",
    "flag-gb": "๐ฌ๐ง",
    "flag-gd": "๐ฌ๐ฉ",
    "flag-ge": "๐ฌ๐ช",
    "flag-gf": "๐ฌ๐ซ",
    "flag-gg": "๐ฌ๐ฌ",
    "flag-gh": "๐ฌ๐ญ",
    "flag-gi": "๐ฌ๐ฎ",
    "flag-gl": "๐ฌ๐ฑ",
    "flag-gm": "๐ฌ๐ฒ",
    "flag-gn": "๐ฌ๐ณ",
    "flag-gp": "๐ฌ๐ต",
    "flag-gq": "๐ฌ๐ถ",
    "flag-gr": "๐ฌ๐ท",
    "flag-gs": "๐ฌ๐ธ",
    "flag-gt": "๐ฌ๐น",
    "flag-gu": "๐ฌ๐บ",
    "flag-gw": "๐ฌ๐ผ",
    "flag-gy": "๐ฌ๐พ",
    "flag-hk": "๐ญ๐ฐ",
    "flag-hm": "๐ญ๐ฒ",
    "flag-hn": "๐ญ๐ณ",
    "flag-hr": "๐ญ๐ท",
    "flag-ht": "๐ญ๐น",
    "flag-hu": "๐ญ๐บ",
    "flag-ic": "๐ฎ๐จ",
    "flag-id": "๐ฎ๐ฉ",
    "flag-ie": "๐ฎ๐ช",
    "flag-il": "๐ฎ๐ฑ",
    "flag-im": "๐ฎ๐ฒ",
    "flag-in": "๐ฎ๐ณ",
    "flag-io": "๐ฎ๐ด",
    "flag-iq": "๐ฎ๐ถ",
    "flag-ir": "๐ฎ๐ท",
    "flag-is": "๐ฎ๐ธ",
    "it": "๐ฎ๐น",
    "flag-it": "๐ฎ๐น",
    "flag-je": "๐ฏ๐ช",
    "flag-jm": "๐ฏ๐ฒ",
    "flag-jo": "๐ฏ๐ด",
    "jp": "๐ฏ๐ต",
    "flag-jp": "๐ฏ๐ต",
    "flag-ke": "๐ฐ๐ช",
    "flag-kg": "๐ฐ๐ฌ",
    "flag-kh": "๐ฐ๐ญ",
    "flag-ki": "๐ฐ๐ฎ",
    "flag-km": "๐ฐ๐ฒ",
    "flag-kn": "๐ฐ๐ณ",
    "flag-kp": "๐ฐ๐ต",
    "kr": "๐ฐ๐ท",
    "flag-kr": "๐ฐ๐ท",
    "flag-kw": "๐ฐ๐ผ",
    "flag-ky": "๐ฐ๐พ",
    "flag-kz": "๐ฐ๐ฟ",
    "flag-la": "๐ฑ๐ฆ",
    "flag-lb": "๐ฑ๐ง",
    "flag-lc": "๐ฑ๐จ",
    "flag-li": "๐ฑ๐ฎ",
    "flag-lk": "๐ฑ๐ฐ",
    "flag-lr": "๐ฑ๐ท",
    "flag-ls": "๐ฑ๐ธ",
    "flag-lt": "๐ฑ๐น",
    "flag-lu": "๐ฑ๐บ",
    "flag-lv": "๐ฑ๐ป",
    "flag-ly": "๐ฑ๐พ",
    "flag-ma": "๐ฒ๐ฆ",
    "flag-mc": "๐ฒ๐จ",
    "flag-md": "๐ฒ๐ฉ",
    "flag-me": "๐ฒ๐ช",
    "flag-mf": "๐ฒ๐ซ",
    "flag-mg": "๐ฒ๐ฌ",
    "flag-mh": "๐ฒ๐ญ",
    "flag-mk": "๐ฒ๐ฐ",
    "flag-ml": "๐ฒ๐ฑ",
    "flag-mm": "๐ฒ๐ฒ",
    "flag-mn": "๐ฒ๐ณ",
    "flag-mo": "๐ฒ๐ด",
    "flag-mp": "๐ฒ๐ต",
    "flag-mq": "๐ฒ๐ถ",
    "flag-mr": "๐ฒ๐ท",
    "flag-ms": "๐ฒ๐ธ",
    "flag-mt": "๐ฒ๐น",
    "flag-mu": "๐ฒ๐บ",
    "flag-mv": "๐ฒ๐ป",
    "flag-mw": "๐ฒ๐ผ",
    "flag-mx": "๐ฒ๐ฝ",
    "flag-my": "๐ฒ๐พ",
    "flag-mz": "๐ฒ๐ฟ",
    "flag-na": "๐ณ๐ฆ",
    "flag-nc": "๐ณ๐จ",
    "flag-ne": "๐ณ๐ช",
    "flag-nf": "๐ณ๐ซ",
    "flag-ng": "๐ณ๐ฌ",
    "flag-ni": "๐ณ๐ฎ",
    "flag-nl": "๐ณ๐ฑ",
    "flag-no": "๐ณ๐ด",
    "flag-np": "๐ณ๐ต",
    "flag-nr": "๐ณ๐ท",
    "flag-nu": "๐ณ๐บ",
    "flag-nz": "๐ณ๐ฟ",
    "flag-om": "๐ด๐ฒ",
    "flag-pa": "๐ต๐ฆ",
    "flag-pe": "๐ต๐ช",
    "flag-pf": "๐ต๐ซ",
    "flag-pg": "๐ต๐ฌ",
    "flag-ph": "๐ต๐ญ",
    "flag-pk": "๐ต๐ฐ",
    "flag-pl": "๐ต๐ฑ",
    "flag-pm": "๐ต๐ฒ",
    "flag-pn": "๐ต๐ณ",
    "flag-pr": "๐ต๐ท",
    "flag-ps": "๐ต๐ธ",
    "flag-pt": "๐ต๐น",
    "flag-pw": "๐ต๐ผ",
    "flag-py": "๐ต๐พ",
    "flag-qa": "๐ถ๐ฆ",
    "flag-re": "๐ท๐ช",
    "flag-ro": "๐ท๐ด",
    "flag-rs": "๐ท๐ธ",
    "ru": "๐ท๐บ",
    "flag-ru": "๐ท๐บ",
    "flag-rw": "๐ท๐ผ",
    "flag-sa": "๐ธ๐ฆ",
    "flag-sb": "๐ธ๐ง",
    "flag-sc": "๐ธ๐จ",
    "flag-sd": "๐ธ๐ฉ",
    "flag-se": "๐ธ๐ช",
    "flag-sg": "๐ธ๐ฌ",
    "flag-sh": "๐ธ๐ญ",
    "flag-si": "๐ธ๐ฎ",
    "flag-sj": "๐ธ๐ฏ",
    "flag-sk": "๐ธ๐ฐ",
    "flag-sl": "๐ธ๐ฑ",
    "flag-sm": "๐ธ๐ฒ",
    "flag-sn": "๐ธ๐ณ",
    "flag-so": "๐ธ๐ด",
    "flag-sr": "๐ธ๐ท",
    "flag-ss": "๐ธ๐ธ",
    "flag-st": "๐ธ๐น",
    "flag-sv": "๐ธ๐ป",
    "flag-sx": "๐ธ๐ฝ",
    "flag-sy": "๐ธ๐พ",
    "flag-sz": "๐ธ๐ฟ",
    "flag-ta": "๐น๐ฆ",
    "flag-tc": "๐น๐จ",
    "flag-td": "๐น๐ฉ",
    "flag-tf": "๐น๐ซ",
    "flag-tg": "๐น๐ฌ",
    "flag-th": "๐น๐ญ",
    "flag-tj": "๐น๐ฏ",
    "flag-tk": "๐น๐ฐ",
    "flag-tl": "๐น๐ฑ",
    "flag-tm": "๐น๐ฒ",
    "flag-tn": "๐น๐ณ",
    "flag-to": "๐น๐ด",
    "flag-tr": "๐น๐ท",
    "flag-tt": "๐น๐น",
    "flag-tv": "๐น๐ป",
    "flag-tw": "๐น๐ผ",
    "flag-tz": "๐น๐ฟ",
    "flag-ua": "๐บ๐ฆ",
    "flag-ug": "๐บ๐ฌ",
    "flag-um": "๐บ๐ฒ",
    "flag-un": "๐บ๐ณ",
    "us": "๐บ๐ธ",
    "flag-us": "๐บ๐ธ",
    "flag-uy": "๐บ๐พ",
    "flag-uz": "๐บ๐ฟ",
    "flag-va": "๐ป๐ฆ",
    "flag-vc": "๐ป๐จ",
    "flag-ve": "๐ป๐ช",
    "flag-vg": "๐ป๐ฌ",
    "flag-vi": "๐ป๐ฎ",
    "flag-vn": "๐ป๐ณ",
    "flag-vu": "๐ป๐บ",
    "flag-wf": "๐ผ๐ซ",
    "flag-ws": "๐ผ๐ธ",
    "flag-xk": "๐ฝ๐ฐ",
    "flag-ye": "๐พ๐ช",
    "flag-yt": "๐พ๐น",
    "flag-za": "๐ฟ๐ฆ",
    "flag-zm": "๐ฟ๐ฒ",
    "flag-zw": "๐ฟ๐ผ"
}