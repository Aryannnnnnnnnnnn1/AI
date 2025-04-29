document.addEventListener("DOMContentLoaded", () => {
    const API_KEY = "AIzaSyDCotOh4uy5xcyEU5pmk5qg5f6UQM0dTF8";
    const user_input = document.querySelector("#chatInput");
    const chat_form = document.querySelector("#chatForm");
    const chat_box = document.querySelector(".chat-box");
    const chattxt=document.querySelector(".chat-txt")
    const chatusermsg=document.querySelectorAll(".chat-message user")
    const chatbotmsg=document.querySelectorAll(".chat-message bot")

    if (chatbotmsg.length === 0||chatusermsg.length === 0) {
        new TypeIt(chattxt, {
            cursor: false,
        })
            .type("Ask Open-AI AnyThing", { delay: 3000 })
            .go();
    }
    

    async function getMessages() {
        chat_form.disabled=true;
        const userMessage = user_input.value.trim();
        if (!userMessage) return;

        new TypeIt(chattxt, {
            cursor: false,
        })
            .delete(21, { delay: 2000 })
            .go();

        chat_box.insertAdjacentHTML("beforeend", `
            <div class="chat-message user">${userMessage}</div>
        `);
        chat_box.scrollTop = chat_box.scrollHeight;

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: userMessage }] }],
                generationConfig: { maxOutputTokens: 1000 }
            })
        };

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, options);
            const data = await response.json();
            const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI."; 
            chat_box.insertAdjacentHTML("beforeend", `
                <div class="chat-message bot">${botReply
                    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                    .replace(/(?<!^) \*(.*?)$/gm, "<li>$1</li>")
                    .replace(/\n/g, "<br>")}</div>
            `);
        } catch (error) {
            console.error("Error:", error);
            chat_box.insertAdjacentHTML("beforeend", `<div style="color:red; opacity:0.8;" class="chat-message bot error">Something went wrong.</div>`);
        }
        finally{
            chat_form.disabled=false;
            user_input.value = "";
            chat_box.scrollTop = chat_box.scrollHeight;
        }
    }

    chat_form.addEventListener("submit", (e) => {
        e.preventDefault();
        getMessages();
    });

    user_input.addEventListener("keydown", (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            getMessages();
        }
    });
});
