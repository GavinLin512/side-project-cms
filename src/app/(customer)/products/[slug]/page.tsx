// test CI
export default function ProductPage({
    params,
}: {
    params: { slug: string };
}) {
    return (
        <div>
            <h1>Product Page {params.slug}</h1>
        </div>
    )
}